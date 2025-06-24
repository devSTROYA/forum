export class AppException extends Error {
  scope: string;

  constructor(message: string, scope: string = 'UnknownError') {
    super(message);
    this.scope = scope;
  }
}
