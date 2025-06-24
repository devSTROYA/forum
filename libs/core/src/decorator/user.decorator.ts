import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export type RefreshTokenPayload = {
  uid: string;
  jti: string;
};

export type AuthenticatedUser = {
  userId: string;
  accessToken: string;
  refreshToken: string;
};

export const LoggedInUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest();
  const user: AuthenticatedUser = request['user'];

  return user;
});
