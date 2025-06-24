import { E, Result } from '@core/logic';
import { Password, User, UserName } from '@domain/user';
import { Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { UserRepo } from '@repository/user';
import { randomUUID } from 'crypto';

import { EnvService } from '@app/env';
import { JwtEnv } from '@config/jwt';
import { RedisClientPoolType } from 'redis';
import { LoginCommand, LoginResult } from './login.command';
import { LoginErrors } from './login.error';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly jwtService: JwtService,
    private readonly eventPublisher: EventPublisher,
    private readonly envService: EnvService<JwtEnv>,
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientPoolType
  ) {}

  async execute(command: LoginCommand): Promise<LoginResult> {
    let user: User;
    let accessToken: string;
    let refreshToken: string;
    let sessionId: string;

    const dtoOrError = Result.combine([
      command.payload.username ? UserName.create(command.payload.username) : Result.ok<UserName>(),
      command.payload.password ? Password.create(command.payload.password) : Result.ok<Password>(),
    ]);

    if (dtoOrError.isFailure()) {
      return E.left(new LoginErrors.InvalidArguments(dtoOrError.getErrorValue()));
    }

    const [username, password] = dtoOrError.getValue();

    try {
      const selectedUser = await this.userRepo.getByUserName(username);
      const userNotFound = selectedUser === undefined;

      if (userNotFound) {
        return E.left(new LoginErrors.UsernameNotFound());
      }

      if (selectedUser.isDeleted) {
        return E.left(new LoginErrors.UserAlreadyDeleted());
      }

      user = this.eventPublisher.mergeObjectContext(selectedUser);
    } catch (error) {
      return E.left(error);
    }

    const validPassword = user.password.verify(password.value);

    if (!validPassword) {
      return E.left(new LoginErrors.IncorrectPassword());
    }

    const uid = user.userId.toString();
    const email = user.email.value;
    const jti = randomUUID();

    try {
      [accessToken, refreshToken] = await Promise.all([
        this.jwtService.signAsync({ uid, email }),
        this.jwtService.signAsync(
          { uid, jti },
          {
            algorithm: 'HS256',
            expiresIn: this.envService.get('JWT_REFRESH_EXPIRES_IN'),
            secret: this.envService.get('JWT_REFRESH_SECRET'),
          }
        ),
      ]);

      await this.redis.set(
        `${uid}:${jti}`,
        JSON.stringify({
          userId: uid,
          accessToken,
          refreshToken,
        }),
        {
          expiration: { type: 'EX', value: 24 * 60 * 60 },
        }
      );
    } catch (error) {
      return E.left(error);
    }

    user.setAccessToken(accessToken, refreshToken);

    user.commit();

    return E.right({ accessToken, refreshToken });
  }
}
