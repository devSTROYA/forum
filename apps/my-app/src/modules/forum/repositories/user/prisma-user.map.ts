// import { UniqueEntityID } from '@core/domain';
// import { EmailAddress, Password, User } from '@domain/user';
// import { Prisma } from '@prisma/client';

// type PrismaUser = Prisma.UserGetPayload<{
//   include: { password: true };
// }>;

// export class PrismaUserMap {
//   static toDomain(user: PrismaUser): User {
//     const emailAddress = EmailAddress.fromPersistence(user.emailAddress);
//     const password = Password.fromPersistence({
//       value: user.password.hashedValue,
//       isHashed: true,
//       resetToken: user.password.resetToken,
//       resetTokenExpiredAt: user.password.resetTokenExpiredAt,
//       updatedAt: user.password.updatedAt,
//     });

//     return User.fromPersistence(
//       {
//         ...user,
//         emailAddress,
//         password,
//       },
//       new UniqueEntityID(user.id)
//     );
//   }

//   static toPersistence(user: User): PrismaUser {
//     const password = {
//       userId: user.userId.toString(),
//       hashedValue: user.password.hashedValue,
//       resetToken: user.password.resetToken,
//       resetTokenExpiredAt: user.password.resetTokenExpiredAt,
//       updatedAt: user.updatedAt,
//     };

//     return {
//       id: user.userId.toString(),
//       emailAddress: user.emailAddress.value,
//       password,
//       bio: user.bio,
//       imageUrl: user.imageUrl,
//       name: user.name,
//       createdAt: user.createdAt,
//       updatedAt: user.updatedAt,
//       deletedAt: user.deletedAt,
//     };
//   }
// }
