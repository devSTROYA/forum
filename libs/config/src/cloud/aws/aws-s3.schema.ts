import { z } from 'zod/v4';

export const AwsS3EnvSchema = z.object({
  AWS_S3_BUCKET_NAME: z.string({ message: 'AWS_S3_BUCKET_NAME is required.' }),
  AWS_CLOUDFRONT_DOMAIN: z.string({ message: 'AWS_CLOUDFRONT_DOMAIN is required.' }),
});

export type AwsS3Env = z.infer<typeof AwsS3EnvSchema>;
