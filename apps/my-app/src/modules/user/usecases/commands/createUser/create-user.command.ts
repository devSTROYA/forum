import { AppCommand } from '@app/cqrs';
import { AppException } from '@app/exception';
import { E } from '@core/logic';

import { CreateUserDto, CreateUserResponseDto } from './create-user.dto';
import { CreateUserErrors } from './create-user.error';

export class CreateUserCommand extends AppCommand<CreateUserDto, CreateUserResult> {}

export type CreateUserResult = E.Either<
  | AppException
  | CreateUserErrors.EmailAddressAlreadyExists
  | CreateUserErrors.InvalidArguments
  | CreateUserErrors.UsernameAlreadyExists,
  CreateUserResponseDto
>;
