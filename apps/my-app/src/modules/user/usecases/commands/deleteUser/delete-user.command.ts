import { AppCommand } from '@app/cqrs';
import { AppException } from '@app/exception';
import { E } from '@core/logic';

import { DeleteUserDto, DeleteUserResponseDto } from './delete-user.dto';
import { DeleteUserErrors } from './delete-user.error';

export class DeleteUserCommand extends AppCommand<DeleteUserDto, DeleteUserResult> {}

export type DeleteUserResult = E.Either<
  AppException | DeleteUserErrors.UserNotFound | DeleteUserErrors.UserAlreadyDeleted,
  DeleteUserResponseDto
>;
