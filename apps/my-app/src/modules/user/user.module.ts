import { EnvModule, EnvService } from '@app/env';
import { RedisDatabaseEnv, RedisDatabaseEnvSchema } from '@config/database';
import { Module } from '@nestjs/common';
import { UserRepo } from '@repository/user';
import { createClientPool } from 'redis';

import { userControllers } from './controllers';
import { userEventHandlers } from './events';
import { PrismaUserRepo } from './repositories/user';
import { userCommandHandlers } from './usecases/commands';
import { userQueryHandlers } from './usecases/queries';

@Module({
  imports: [EnvModule.forRoot('Redis', RedisDatabaseEnvSchema)],
  controllers: [...userControllers],
  providers: [
    ...userCommandHandlers,
    ...userQueryHandlers,
    ...userEventHandlers,
    {
      provide: UserRepo,
      useClass: PrismaUserRepo,
    },
    {
      inject: [EnvService],
      provide: 'REDIS_CLIENT',
      useFactory: async (envService: EnvService<RedisDatabaseEnv>) => {
        const redis = createClientPool({
          url: envService.get('REDIS_URI'),
        });

        await redis.connect();

        return redis;
      },
    },
  ],
  exports: [],
})
export class UserModule {}
