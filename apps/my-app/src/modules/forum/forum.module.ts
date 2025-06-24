import { Module } from '@nestjs/common';
// import { UserRepo } from '@repository/user';

// import { PrismaUserRepo } from './repositories/user';

@Module({
  imports: [],
  controllers: [],
  providers: [
    // {
    //   provide: UserRepo,
    //   useClass: PrismaUserRepo,
    // },
  ],
  exports: [],
})
export class UserModule {}
