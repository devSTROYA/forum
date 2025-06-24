import { z } from 'zod';

export const ResendEmailEnvSchema = z.object({
  EMAIL_SENDER_ACCOUNT: z.string({ message: 'EMAIL_SENDER_ACCOUNT is required.' }),
  RESEND_API_KEY: z.string({ message: 'RESEND_API_KEY is required.' }),
});

export type ResendEmailEnv = z.infer<typeof ResendEmailEnvSchema>;
