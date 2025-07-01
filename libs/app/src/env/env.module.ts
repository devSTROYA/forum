import { AppLogger } from '@app/logger';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ZodObject } from 'zod/v4';

import { envOpts } from './env.options';
import { EnvService } from './env.service';

const { envFilePath } = envOpts();

@Module({})
export class EnvModule {
  static forRoot(name: string, schema: ZodObject, isGlobal?: boolean): DynamicModule {
    const logger = new AppLogger(`${name} Env`);

    return {
      global: isGlobal ?? false,
      module: EnvModule,
      imports: [
        ConfigModule.forRoot({
          envFilePath,
          validate: (config) => {
            const { error: parseError, data } = schema.safeParse(config);

            if (parseError) {
              const errors: Array<{ message: string }> = JSON.parse(parseError.message);

              for (const error of errors) {
                logger.error(error.message);
              }

              logger.error(`Failed to validate env variables.`);
            } else {
              logger.log(`Env variables validated.`);

              return data;
            }
          },
        }),
      ],
      providers: [EnvService],
      exports: [EnvService],
    };
  }
}
