import { EmailAddress, User, UserId, UserName } from '@domain/user';
import { DatabaseService, PrismaAdapter } from '@external/database';
import { Injectable } from '@nestjs/common';
import { UserRepo } from '@repository/user';
import { PrismaUserMap } from './prisma-user.map';

@Injectable()
export class PrismaUserRepo implements UserRepo {
  constructor(private readonly databaseService: DatabaseService<PrismaAdapter>) {}

  async exists(email: EmailAddress): Promise<boolean> {
    const selectedUser = await this.databaseService.tx.user.findUnique({
      where: { email: email.value },
    });

    return !!selectedUser;
  }

  async getByUserId(id: UserId): Promise<User> {
    const selectedUser = await this.databaseService.tx.user.findUnique({
      where: { id: id.toString() },
    });

    return selectedUser ? PrismaUserMap.toDomain(selectedUser) : undefined;
  }

  async getByUserName(username: UserName): Promise<User> {
    const selectedUser = await this.databaseService.tx.user.findUnique({
      where: { username: username.value },
    });

    return selectedUser ? PrismaUserMap.toDomain(selectedUser) : undefined;
  }

  async save(user: User): Promise<void> {
    const { id, email, ...userData } = PrismaUserMap.toPersistence(user);
    const selectedUser = await this.databaseService.tx.user.findUnique({
      where: { email },
    });

    if (selectedUser) {
      await this.databaseService.tx.user.update({
        where: { email },
        data: userData,
      });
    } else {
      await this.databaseService.tx.user.create({
        data: { id, email, ...userData },
      });
    }
  }
}
