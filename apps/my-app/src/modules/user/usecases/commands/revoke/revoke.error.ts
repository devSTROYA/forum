import { AppException } from '@app/exception';

export namespace RevokeErrors {
  export class InvalidOrExpiredRefreshToken extends AppException {
    constructor() {
      super('Refresh token is invalid or expired.', InvalidOrExpiredRefreshToken.name);
    }
  }

  export class UserNotFound extends AppException {
    constructor() {
      super('User not found.', UserNotFound.name);
    }
  }
}
