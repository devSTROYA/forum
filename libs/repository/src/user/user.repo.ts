import { EmailAddress, User, UserId, UserName } from '@domain/user';

export abstract class UserRepo {
  abstract exists(email: EmailAddress): Promise<boolean>;
  abstract getByUserId(id: UserId): Promise<User>;
  abstract getByUserName(username: UserName): Promise<User>;
  abstract save(user: User): Promise<void>;
}
