import { EnvService } from '@app/env';
import { JwtEnv } from '@config/jwt';
import { AuthenticatedUser, RefreshTokenPayload } from '@core/decorator';
import { E } from '@core/logic';
import { User, UserId } from '@domain/user';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { UserRepo } from '@repository/user';
import { RedisClientPoolType } from 'redis';

import { RevokeCommand, RevokeResult } from './revoke.command';
import { RevokeErrors } from './revoke.error';

@CommandHandler(RevokeCommand)
export class RevokeCommandHandler implements ICommandHandler<RevokeCommand> {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly jwtService: JwtService,
    private readonly envService: EnvService<JwtEnv>,
    @Inject('REDIS_CLIENT') private readonly redis: RedisClientPoolType
  ) {}

  async execute(command: RevokeCommand): Promise<RevokeResult> {
    let refreshTokenPayload: RefreshTokenPayload;
    let authenticatedUser: AuthenticatedUser;
    let user: User;
    let accessToken: string;

    try {
      refreshTokenPayload = await this.jwtService.verifyAsync(command.payload.refreshToken, {
        secret: this.envService.get('JWT_REFRESH_SECRET'),
      });
    } catch (error) {
      return E.left(error);
    }

    try {
      const storedSession = await this.redis.get(`${refreshTokenPayload.uid}:${refreshTokenPayload.jti}`);

      if (!storedSession) {
        return E.left(new RevokeErrors.InvalidOrExpiredRefreshToken());
      }

      authenticatedUser = JSON.parse(storedSession as string);
    } catch (error) {
      return E.left(error);
    }

    const userId = UserId.retrieve(authenticatedUser.userId);

    try {
      user = await this.userRepo.getByUserId(userId);

      if (!user) {
        return E.left(new RevokeErrors.UserNotFound());
      }
    } catch (error) {
      return E.left(error);
    }

    const uid = user.userId.toString();
    const email = user.email.value;

    try {
      accessToken = await this.jwtService.signAsync({ uid, email });
    } catch (error) {
      return E.left(error);
    }

    return E.right({ accessToken });
  }
}
