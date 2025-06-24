import { E } from '@core/logic';
import { User, UserId } from '@domain/user';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepo } from '@repository/user';

import { DeleteUserCommand, DeleteUserResult } from './delete-user.command';
import { DeleteUserErrors } from './delete-user.error';

@CommandHandler(DeleteUserCommand)
export class DeleteUserCommandHandler implements ICommandHandler<DeleteUserCommand> {
  constructor(
    private readonly userRepo: UserRepo,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(command: DeleteUserCommand): Promise<DeleteUserResult> {
    const userId = UserId.retrieve(command.payload.userId);

    let user: User;

    try {
      const selectedUser = await this.userRepo.getByUserId(userId);
      const userNotFound = selectedUser === undefined;

      if (userNotFound) {
        return E.left(new DeleteUserErrors.UserNotFound());
      }

      user = this.eventPublisher.mergeObjectContext(selectedUser);
    } catch (error) {
      return E.left(error);
    }

    const doesUserDeleted = user.delete();

    if (!doesUserDeleted) {
      return E.left(new DeleteUserErrors.UserAlreadyDeleted());
    }

    try {
      await this.userRepo.save(user);
    } catch (error) {
      return E.left(error);
    }

    user.commit();

    return E.right(undefined);
  }
}
