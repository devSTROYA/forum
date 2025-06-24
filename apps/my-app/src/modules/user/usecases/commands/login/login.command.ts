import { AppCommand } from '@app/cqrs';
import { AppException } from '@app/exception';
import { E } from '@core/logic';

import { LoginDto, LoginResponseDto } from './login.dto';
import { LoginErrors } from './login.error';

export class LoginCommand extends AppCommand<LoginDto, LoginResult> {}

export type LoginResult = E.Either<
  | AppException
  | LoginErrors.IncorrectPassword
  | LoginErrors.InvalidArguments
  | LoginErrors.UsernameNotFound
  | LoginErrors.UserAlreadyDeleted,
  LoginResponseDto
>;
