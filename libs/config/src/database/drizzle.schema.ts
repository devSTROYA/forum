import { z } from 'zod/v4';

export const DrizzleDatabaseEnvSchema = z.object({
  DB_URI: z.string({ message: 'DB_URI is required.' }),
});

export type DrizzleDatabaseEnv = z.infer<typeof DrizzleDatabaseEnvSchema>;
