export abstract class Handler<T> {
  abstract badGateway(message: string, scope?: string): T;
  abstract badRequest(message: string, scope?: string): T;
  abstract conflict(message: string, scope?: string): T;
  abstract forbidden(message: string, scope?: string): T;
  abstract timeout(message: string, scope?: string): T;
  abstract fail(message: string, scope?: string): T;
  abstract notFound(message: string, scope?: string): T;
  abstract tooManyRequests(message: string, scope?: string): T;
  abstract unauthorized(message: string, scope?: string): T;
  abstract unprocessable(message: string, scope?: string): T;
}
