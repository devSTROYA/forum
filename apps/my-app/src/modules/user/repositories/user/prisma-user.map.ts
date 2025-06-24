import { EmailAddress, Password, User, UserId, UserName } from '@domain/user';
import { Prisma } from '@prisma/client';

type PrismaUser = Prisma.UserGetPayload<{}>;

export class PrismaUserMap {
  static toDomain(user: PrismaUser): User {
    const username = UserName.retrieve(user.username);
    const email = EmailAddress.retrieve(user.email);
    const password = Password.retrieve(user.password);

    return User.retrieve(
      {
        ...user,
        email,
        password,
        username,
      },
      UserId.retrieve(user.id)
    );
  }

  static toPersistence(user: User): PrismaUser {
    return {
      id: user.userId.toString(),
      email: user.email.value,
      isEmailVerified: user.isEmailVerified,
      username: user.username.value,
      password: user.password.hashedValue,
      isDeleted: user.isDeleted,
      isAdminUser: user.isAdminUser,
    };
  }
}
