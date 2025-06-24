import { User } from '@domain/user';
import { UserDto } from './user.dto';

export class UserMap {
  static toDto(user: User): UserDto {
    return {
      userId: user.userId.toString(),
      username: user.username.value,
      isEmailVerified: user.isEmailVerified,
      isAdminUser: user.isAdminUser,
      isDeleted: user.isDeleted,
    };
  }
}
