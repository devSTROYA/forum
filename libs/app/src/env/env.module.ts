import { AppLogger } from '@app/logger';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ZodSchema } from 'zod';

import { envOpts } from './env.options';
import { EnvService } from './env.service';

const { envFilePath } = envOpts();

@Module({})
export class EnvModule {
  static forRoot(name: string, schema: ZodSchema, isGlobal?: boolean): DynamicModule {
    const logger = new AppLogger(`${name} Env`);

    return {
      global: isGlobal ?? false,
      module: EnvModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath,
          validate: (config) => {
            const { error, data } = schema.safeParse(config);

            if (error) {
              for (const err of error.errors) {
                logger.error(err.message);
              }

              throw new Error(`Failed to validate env variables.`);
            }

            logger.log(`Env variables validated.`);

            return data;
          },
        }),
      ],
      providers: [EnvService],
      exports: [EnvService],
    };
  }
}
