import { z } from 'zod';

export const JwtEnvSchema = z.object({
  JWT_PRIVATE_KEY_PATH: z.string({ message: 'JWT_PRIVATE_KEY_PATH is required.' }),
  JWT_PUBLIC_KEY_PATH: z.string({ message: 'JWT_PUBLIC_KEY_PATH is required.' }),
  JWT_ACCESS_EXPIRES_IN: z.string({ message: 'JWT_ACCESS_EXPIRES_IN is required.' }),
  JWT_REFRESH_EXPIRES_IN: z.string({ message: 'JWT_REFRESH_EXPIRES_IN is required.' }),
  JWT_REFRESH_SECRET: z.string({ message: 'JWT_REFRESH_SECRET is required.' }),
});

export type JwtEnv = z.infer<typeof JwtEnvSchema>;
