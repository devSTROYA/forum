// import { UniqueEntityID } from '@core/domain';
// import { EmailAddress, User } from '@domain/user';
// import { DatabaseService, PrismaAdapter } from '@external/database';
// import { Injectable } from '@nestjs/common';
// import { UserRepo } from '@repository/user';
// import { PrismaUserMap } from './prisma-user.map';

// @Injectable()
// export class PrismaUserRepo implements UserRepo {
//   constructor(private readonly databaseService: DatabaseService<PrismaAdapter>) {}

//   async getById(userId: UniqueEntityID): Promise<User> {
//     const selectedUser = await this.databaseService.tx.user.findUnique({
//       where: { id: userId.toString() },
//       include: { password: true },
//     });

//     return selectedUser ? PrismaUserMap.toDomain(selectedUser) : undefined;
//   }

//   async getByEmailAddress(emailAddress: EmailAddress): Promise<User> {
//     const selectedUser = await this.databaseService.tx.user.findUnique({
//       where: { emailAddress: emailAddress.value },
//       include: { password: true },
//     });

//     return selectedUser ? PrismaUserMap.toDomain(selectedUser) : undefined;
//   }

//   async save(user: User): Promise<void> {
//     const { id, password, ...userData } = PrismaUserMap.toPersistence(user);
//     const selectedUser = await this.databaseService.tx.user.findUnique({
//       where: { id },
//       include: { password: true },
//     });

//     if (selectedUser) {
//       await this.databaseService.tx.user.update({
//         where: { id },
//         data: {
//           ...userData,
//           password: { update: password },
//         },
//       });
//     } else {
//       await this.databaseService.tx.user.create({
//         data: {
//           id,
//           ...userData,
//           password: { create: password },
//         },
//       });
//     }
//   }

//   async delete(userId: UniqueEntityID): Promise<void> {
//     await this.databaseService.tx.user.update({
//       where: { id: userId.toString() },
//       data: { deletedAt: new Date() },
//     });
//   }
// }
