import { HttpException, HttpStatus } from '@nestjs/common';

import { AppLogger } from '@app/logger';
import { Handler } from '../handler';

export class HttpHandler implements Handler<HttpException> {
  private readonly logger = new AppLogger(HttpException.name);

  badGateway(message: string, scope?: string): HttpException {
    return new HttpException({ message, scope }, HttpStatus.BAD_GATEWAY);
  }

  badRequest(message: string, scope?: string): HttpException {
    return new HttpException({ message, scope }, HttpStatus.BAD_REQUEST);
  }

  conflict(message: string, scope?: string): HttpException {
    return new HttpException({ message, scope }, HttpStatus.CONFLICT);
  }

  fail(message: string, scope?: string): HttpException {
    this.logger.error(message);
    return new HttpException(
      {
        scope,
        message: 'Something went wrong, please contact support for more information.',
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }

  forbidden(message: string, scope?: string): HttpException {
    return new HttpException({ message, scope }, HttpStatus.FORBIDDEN);
  }

  notFound(message: string, scope?: string): HttpException {
    return new HttpException({ message, scope }, HttpStatus.NOT_FOUND);
  }

  timeout(message: string, scope?: string): HttpException {
    return new HttpException({ message, scope }, HttpStatus.REQUEST_TIMEOUT);
  }

  tooManyRequests(message: string, scope?: string): HttpException {
    return new HttpException({ message, scope }, HttpStatus.TOO_MANY_REQUESTS);
  }

  unauthorized(message: string, scope?: string): HttpException {
    return new HttpException({ message, scope }, HttpStatus.UNAUTHORIZED);
  }

  unprocessable(message: string, scope?: string): HttpException {
    return new HttpException({ message, scope }, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
