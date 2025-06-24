import { AppLogger } from '@app/logger';
import { UserCreatedEvent } from '@event/user';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserCreatedEvent)
export class UserCreatedEventHandler implements IEventHandler<UserCreatedEvent> {
  private readonly logger = new AppLogger(UserCreatedEventHandler.name);

  handle(event: UserCreatedEvent) {
    const { userId } = event.payload;

    this.logger.log(`User with ID ${userId} has been created.`);
  }
}
