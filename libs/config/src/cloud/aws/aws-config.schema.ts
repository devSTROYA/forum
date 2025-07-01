import { z } from 'zod/v4';

export const AwsConfigEnvSchema = z.object({
  AWS_ACCESS_KEY_ID: z.string({ message: 'AWS_ACCESS_KEY_ID is required.' }),
  AWS_SECRET_ACCESS_KEY: z.string({ message: 'AWS_SECRET_ACCESS_KEY is required.' }),
  AWS_REGION: z.string({ message: 'AWS_REGION is required.' }),
});

export type AwsConfigEnv = z.infer<typeof AwsConfigEnvSchema>;
