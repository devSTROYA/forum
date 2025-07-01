import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterDrizzleOrm } from '@nestjs-cls/transactional-adapter-drizzle-orm';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { DynamicModule, Module, Type } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

import { DRIZZLE_TOKEN, DrizzleModule } from './adapters/drizzle';
import { PRISMA_TOKEN, PrismaModule } from './adapters/prisma';
import { DatabaseOption } from './database.option';

@Module({})
export class DatabaseModule {
  static register(option: DatabaseOption, isGlobal?: boolean): DynamicModule {
    let databaseClient: DynamicModule | Promise<DynamicModule> | Type<any>;

    switch (option) {
      case 'PRISMA':
        databaseClient = ClsModule.forRoot({
          plugins: [
            new ClsPluginTransactional({
              imports: [PrismaModule],
              adapter: new TransactionalAdapterPrisma({
                prismaInjectionToken: PRISMA_TOKEN,
              }),
            }),
          ],
        });

        break;
      case 'DRIZZLE':
        databaseClient = ClsModule.forRoot({
          plugins: [
            new ClsPluginTransactional({
              imports: [DrizzleModule],
              adapter: new TransactionalAdapterDrizzleOrm({
                drizzleInstanceToken: DRIZZLE_TOKEN,
              }),
            }),
          ],
        });

        break;
      default:
        throw new Error(`Invalid database option: ${option}`);
    }

    return {
      global: isGlobal ?? false,
      module: DatabaseModule,
      imports: [databaseClient],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
