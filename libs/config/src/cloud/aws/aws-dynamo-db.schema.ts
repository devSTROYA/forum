import { z } from 'zod';

export const AwsDynamoDBEnvSchema = z.object({
  AWS_DYNAMO_DB_TABLE_NAME: z.string({ message: 'AWS_DYNAMO_DB_TABLE_NAME is required.' }),
});

export type AwsDynamoDBEnv = z.infer<typeof AwsDynamoDBEnvSchema>;
