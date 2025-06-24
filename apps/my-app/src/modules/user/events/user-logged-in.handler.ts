import { AppLogger } from '@app/logger';
import { UserLoggedInEvent } from '@event/user';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserLoggedInEvent)
export class UserLoggedInEventHandler implements IEventHandler<UserLoggedInEvent> {
  private readonly logger = new AppLogger(UserLoggedInEventHandler.name);

  handle(event: UserLoggedInEvent) {
    const { userId } = event.payload;

    this.logger.log(`User with ID ${userId} has been logged in.`);
  }
}
