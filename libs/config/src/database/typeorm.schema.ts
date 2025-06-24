import { z } from 'zod';

export const TypeOrmDatabaseEnvSchema = z.object({
  DB_URI: z.string({ message: 'DB_URI is required.' }),
});

export type TypeOrmDatabaseEnv = z.infer<typeof TypeOrmDatabaseEnvSchema>;
