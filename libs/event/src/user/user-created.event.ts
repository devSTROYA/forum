import { AppEvent } from '@app/cqrs';

type Payload = {
  userId: string;
};

export class UserCreatedEvent extends AppEvent<Payload> {}
