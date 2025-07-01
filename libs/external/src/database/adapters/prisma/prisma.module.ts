import { EnvModule, EnvService } from '@app/env';
import { PrismaDatabaseEnv, PrismaDatabaseEnvSchema } from '@config/database';
import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PRISMA_TOKEN } from './prisma.token';

@Module({
  imports: [EnvModule.forRoot('Prisma', PrismaDatabaseEnvSchema)],
  controllers: [],
  providers: [
    {
      inject: [EnvService],
      provide: PRISMA_TOKEN,
      useFactory: (envService: EnvService<PrismaDatabaseEnv>) => {
        const client = new PrismaClient({
          datasourceUrl: envService.get('DB_URI'),
        });

        return client;
      },
    },
  ],
  exports: [PRISMA_TOKEN],
})
export class PrismaModule {}
