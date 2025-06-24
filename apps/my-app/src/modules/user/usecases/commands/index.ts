import { CreateUserCommandHandler } from './createUser';
import { DeleteUserCommandHandler } from './deleteUser';
import { LoginCommandHandler } from './login';
import { RevokeCommandHandler } from './revoke';

export const userCommandHandlers = [
  CreateUserCommandHandler,
  DeleteUserCommandHandler,
  LoginCommandHandler,
  RevokeCommandHandler,
];
