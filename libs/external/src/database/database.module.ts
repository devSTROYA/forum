import { EnvModule } from '@app/env';
import { PrismaDatabaseEnvSchema } from '@config/database';
import { ClsPluginTransactional, TransactionalAdapter } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { DynamicModule, Module, Type } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';

import { PrismaModule, PrismaService } from './adapters/prisma';
import { DatabaseOption } from './database.option';

@Module({})
export class DatabaseModule {
  private static setupCls(
    module: DynamicModule | Promise<DynamicModule> | Type<any>,
    adapter: TransactionalAdapter<any, any, any>
  ) {
    return ClsModule.forRoot({
      plugins: [
        new ClsPluginTransactional({
          imports: [module],
          adapter,
        }),
      ],
    });
  }

  static register(option: DatabaseOption, isGlobal?: false): DynamicModule {
    const imports: (DynamicModule | Promise<DynamicModule> | Type<any>)[] = [];

    switch (option) {
      case 'PRISMA':
        imports.push(EnvModule.forRoot('Prisma Database', PrismaDatabaseEnvSchema));
        imports.push(
          this.setupCls(
            PrismaModule,
            new TransactionalAdapterPrisma({
              prismaInjectionToken: PrismaService,
            })
          )
        );
        break;
      default:
        throw new Error(`Invalid database option: ${option}`);
    }

    return {
      global: isGlobal ?? false,
      module: DatabaseModule,
      imports,
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
