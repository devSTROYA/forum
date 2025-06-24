import { AppException } from '@app/exception';

export namespace LoginErrors {
  export class InvalidArguments extends AppException {
    constructor(message: string) {
      super(message, InvalidArguments.name);
    }
  }

  export class UsernameNotFound extends AppException {
    constructor() {
      super('Username not found.', UsernameNotFound.name);
    }
  }

  export class IncorrectPassword extends AppException {
    constructor() {
      super('Incorrect password.', IncorrectPassword.name);
    }
  }

  export class UserAlreadyDeleted extends AppException {
    constructor() {
      super('User already deleted.', UserAlreadyDeleted.name);
    }
  }
}
