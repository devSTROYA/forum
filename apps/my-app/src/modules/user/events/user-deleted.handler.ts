import { AppLogger } from '@app/logger';
import { UserDeletedEvent } from '@event/user';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserDeletedEvent)
export class UserDeletedEventHandler implements IEventHandler<UserDeletedEvent> {
  private readonly logger = new AppLogger(UserDeletedEventHandler.name);

  handle(event: UserDeletedEvent) {
    const { userId } = event.payload;

    this.logger.log(`User with ID ${userId} has been deleted.`);
  }
}
