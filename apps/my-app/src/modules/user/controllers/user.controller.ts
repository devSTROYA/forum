import { AuthenticatedUser, LoggedInUser } from '@core/decorator';
import { AuthGuard } from '@core/guards';
import { HttpHandler } from '@core/handler';
import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreateUserCommand, CreateUserDto, CreateUserErrors } from '../usecases/commands/createUser';
import { DeleteUserCommand, DeleteUserErrors } from '../usecases/commands/deleteUser';
import { LoginCommand } from '../usecases/commands/login/login.command';
import { LoginDto } from '../usecases/commands/login/login.dto';
import { LoginErrors } from '../usecases/commands/login/login.error';
import { RevokeCommand, RevokeDto, RevokeErrors } from '../usecases/commands/revoke';
import { GetCurrentUserQuery } from '../usecases/queries/getCurrentUser';

@Controller('user')
export class UserController extends HttpHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
    super();
  }

  @Post('registration')
  async createUser(@Body() dto: CreateUserDto) {
    const result = await this.commandBus.execute(new CreateUserCommand(dto));

    if (result.isLeft()) {
      const error = result.error;
      const { message, scope } = error;
      switch (error.constructor) {
        case CreateUserErrors.EmailAddressAlreadyExists:
          throw this.conflict(message, scope);
        case CreateUserErrors.UsernameAlreadyExists:
          throw this.conflict(message, scope);
        case CreateUserErrors.InvalidArguments:
          throw this.badRequest(message, scope);
        default:
          throw this.fail(message, scope);
      }
    }

    return result.value;
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const result = await this.commandBus.execute(new LoginCommand(dto));

    if (result.isLeft()) {
      const error = result.error;
      const { message, scope } = error;
      switch (error.constructor) {
        case LoginErrors.UsernameNotFound:
          throw this.notFound(message, scope);
        case LoginErrors.IncorrectPassword:
          throw this.unauthorized(message, scope);
        case LoginErrors.InvalidArguments:
          throw this.badRequest(message, scope);
        default:
          throw this.fail(message, scope);
      }
    }

    return result.value;
  }

  @Post('revocation')
  async revoke(@Body() dto: RevokeDto) {
    const result = await this.commandBus.execute(new RevokeCommand(dto));

    if (result.isLeft()) {
      const error = result.error;
      const { message, scope } = error;
      switch (error.constructor) {
        case RevokeErrors.UserNotFound:
          throw this.notFound(message, scope);
        case RevokeErrors.InvalidOrExpiredRefreshToken:
          throw this.unauthorized(message, scope);
          throw this.badRequest(message, scope);
        default:
          throw this.fail(message, scope);
      }
    }

    return result.value;
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async getCurrentUser(@LoggedInUser() user: AuthenticatedUser) {
    const result = await this.queryBus.execute(new GetCurrentUserQuery(user));

    if (result.isLeft()) {
      const error = result.error;
      const { message, scope } = error;
      switch (error.constructor) {
        default:
          throw this.fail(message, scope);
      }
    }

    return result.value;
  }

  @UseGuards(AuthGuard)
  @Delete('deactivation')
  async deleteUser(@LoggedInUser() user: AuthenticatedUser) {
    const result = await this.commandBus.execute(new DeleteUserCommand(user));

    if (result.isLeft()) {
      const error = result.error;
      const { message, scope } = error;
      switch (error.constructor) {
        case DeleteUserErrors.UserNotFound:
          throw this.notFound(message, scope);
        case DeleteUserErrors.UserAlreadyDeleted:
          throw this.conflict(message, scope);
        default:
          throw this.fail(message, scope);
      }
    }

    return result.value;
  }
}
