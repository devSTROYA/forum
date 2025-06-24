import { AppException } from '@app/exception';

export namespace DeleteUserErrors {
  export class UserNotFound extends AppException {
    constructor() {
      super('User not found.', UserNotFound.name);
    }
  }

  export class UserAlreadyDeleted extends AppException {
    constructor() {
      super('User already deleted.', UserAlreadyDeleted.name);
    }
  }
}
