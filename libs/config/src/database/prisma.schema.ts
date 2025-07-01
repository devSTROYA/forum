import { z } from 'zod/v4';

export const PrismaDatabaseEnvSchema = z.object({
  DB_URI: z.string({ message: 'DB_URI is required.' }),
});

export type PrismaDatabaseEnv = z.infer<typeof PrismaDatabaseEnvSchema>;
