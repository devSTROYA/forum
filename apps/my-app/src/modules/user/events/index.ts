import { UserCreatedEventHandler } from './user-created.handler';
import { UserDeletedEventHandler } from './user-deleted.handler';
import { UserLoggedInEventHandler } from './user-logged-in.handler';

export const userEventHandlers = [UserCreatedEventHandler, UserDeletedEventHandler, UserLoggedInEventHandler];
