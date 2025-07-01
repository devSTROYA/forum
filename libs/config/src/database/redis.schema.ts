import { z } from 'zod/v4';

export const RedisDatabaseEnvSchema = z.object({
  REDIS_URI: z.string({ message: 'REDIS_URI is required.' }),
});

export type RedisDatabaseEnv = z.infer<typeof RedisDatabaseEnvSchema>;
