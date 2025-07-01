import { EnvModule, EnvService } from '@app/env';
import { DrizzleDatabaseEnv, DrizzleDatabaseEnvSchema } from '@config/database';
import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';

import { Pool } from 'pg';
import { DRIZZLE_TOKEN } from './drizzle.token';
import * as schema from './schema';

// TODO : set as dynamic module with different database option
@Module({
  imports: [EnvModule.forRoot('Drizzle', DrizzleDatabaseEnvSchema)],
  controllers: [],
  providers: [
    {
      inject: [EnvService],
      provide: DRIZZLE_TOKEN,
      useFactory: (envService: EnvService<DrizzleDatabaseEnv>) => {
        const client = new Pool({
          connectionString: envService.get('DB_URI'),
        });
        const drizzleClient = drizzle({ client, schema });

        return drizzleClient;
      },
    },
  ],
  exports: [DRIZZLE_TOKEN],
})
export class DrizzleModule {}
