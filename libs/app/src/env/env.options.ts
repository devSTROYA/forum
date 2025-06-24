const environments = ['local', 'prod', 'production', 'dev', 'development'] as const;
const envFilePaths = ['.env.local', '.env', '.env.development'] as const;

type EnvType = (typeof environments)[number];
type EnvFilePathType = (typeof envFilePaths)[number];

const validateEnvironment = (environment: string): environment is EnvType => {
  return environments.includes(environment.toLowerCase() as EnvType);
};

export const envOpts = () => {
  let envFilePath: EnvFilePathType;
  let environment: string;

  const nodeEnv = process.env.NODE_ENV;

  if (!validateEnvironment(nodeEnv)) {
    throw new Error('Invalid environment value.');
  }

  switch (nodeEnv) {
    case 'local':
      environment = 'LOCAL';
      envFilePath = `.env.${nodeEnv}`;
      break;
    case 'dev':
      environment = 'DEVELOPMENT';
      envFilePath = '.env.development';
      break;
    case 'development':
      environment = 'DEVELOPMENT';
      envFilePath = `.env.${nodeEnv}`;
      break;
    default:
      environment = 'PRODUCTION';
      envFilePath = '.env';
  }

  return {
    environment,
    envFilePath,
    isProduction: ['prod', 'production'].includes(nodeEnv),
  };
};
