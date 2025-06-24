import { AppEvent } from '@app/cqrs';

type Payload = {
  userId: string;
};

export class UserLoggedInEvent extends AppEvent<Payload> {}
