import { AppEvent } from '@app/cqrs';

type Payload = {
  userId: string;
};

export class UserDeletedEvent extends AppEvent<Payload> {}
