import { E, Result } from '@core/logic';
import { EmailAddress, Password, User, UserName } from '@domain/user';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepo } from '@repository/user';

import { CreateUserCommand, CreateUserResult } from './create-user.command';
import { CreateUserErrors } from './create-user.error';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(command: CreateUserCommand): Promise<CreateUserResult> {
    let user: User;

    const dtoOrError = Result.combine([
      command.payload.email ? EmailAddress.create(command.payload.email) : Result.ok<EmailAddress>(),
      command.payload.username ? UserName.create(command.payload.username) : Result.ok<UserName>(),
      command.payload.password ? Password.create(command.payload.password) : Result.ok<Password>(),
    ]);

    if (dtoOrError.isFailure()) {
      return E.left(new CreateUserErrors.InvalidArguments(dtoOrError.getErrorValue()));
    }

    const [email, username, password] = dtoOrError.getValue();

    const userOrError = User.create({ email, username, password });

    if (userOrError.isFailure()) {
      return E.left(new CreateUserErrors.InvalidArguments(userOrError.getErrorValue()));
    }

    try {
      const emailAlreadyExists = await this.userRepo.exists(email);

      if (emailAlreadyExists) {
        return E.left(new CreateUserErrors.EmailAddressAlreadyExists());
      }
    } catch (error) {
      return E.left(error);
    }

    try {
      const selectedUser = await this.userRepo.getByUserName(username);
      const userNameAlreadyExists = selectedUser !== undefined;

      if (userNameAlreadyExists) {
        return E.left(new CreateUserErrors.UsernameAlreadyExists());
      }
    } catch (error) {
      return E.left(error);
    }

    user = this.eventPublisher.mergeObjectContext(userOrError.getValue());

    try {
      await this.userRepo.save(user);
    } catch (error) {
      return E.left(error);
    }

    user.commit();

    return E.right(undefined);
  }
}
