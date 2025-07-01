import { z } from 'zod/v4';

export const SendGridEmailEnvSchema = z.object({
  EMAIL_SENDER_ACCOUNT: z.string({ message: 'EMAIL_SENDER_ACCOUNT is required.' }),
  RESEND_API_KEY: z.string({ message: 'RESEND_API_KEY is required.' }),
});

export type SendGridEmailEnv = z.infer<typeof SendGridEmailEnvSchema>;
