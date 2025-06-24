import { z } from 'zod';

export const RedisDatabaseEnvSchema = z.object({
  REDIS_URI: z.string({ message: 'REDIS_URI is required.' }),
});

export type RedisDatabaseEnv = z.infer<typeof RedisDatabaseEnvSchema>;
