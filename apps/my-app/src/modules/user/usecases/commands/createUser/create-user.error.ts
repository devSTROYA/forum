import { AppException } from '@app/exception';

export namespace CreateUserErrors {
  export class InvalidArguments extends AppException {
    constructor(message: string) {
      super(message, InvalidArguments.name);
    }
  }

  export class EmailAddressAlreadyExists extends AppException {
    constructor() {
      super('Email address already registered.', EmailAddressAlreadyExists.name);
    }
  }

  export class UsernameAlreadyExists extends AppException {
    constructor() {
      super('Username already taken.', UsernameAlreadyExists.name);
    }
  }
}
