import { HttpHandler } from '@core/handler';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AuthenticatedUser } from '../decorator';

@Injectable()
export class AuthGuard extends HttpHandler implements CanActivate {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) {
      throw this.unauthorized('Token not provided.', 'MissingToken');
    }

    const [bearer, tokenBody] = token.split(' ');

    if (bearer !== 'Bearer') {
      throw this.unauthorized('Invalid token type.', 'InvalidTokenType');
    }

    if (!tokenBody) {
      throw this.unauthorized('Malformed token.', 'MalformedToken');
    }

    try {
      const decoded: AuthenticatedUser = await this.jwtService.verifyAsync(tokenBody);
      request['user'] = decoded;
    } catch (error) {
      throw this.unauthorized(error.message, 'VerifyTokenFailed');
    }

    return true;
  }
}
