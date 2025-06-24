import { envOpts } from '@app/env';
import { AppLogger } from '@app/logger';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { MyAppModule } from './my-app.module';

declare const module: any;

async function bootstrap() {
  let app: INestApplication;
  let logger: AppLogger;
  let port: number;

  logger = new AppLogger('My App');

  try {
    app = await NestFactory.create(MyAppModule, { logger });
  } catch (error) {
    logger.error(error);
  }

  app.enableCors({ origin: '*' });
  app.use(helmet());
  const { isProduction, environment } = envOpts();
  port = isProduction ? 8080 : 3000;

  try {
    await app.listen(port);
    logger.log(`Environment: ${environment}`);
    logger.log(`Running on port ${port}...`);
  } catch (error) {
    logger.error(error);
  }

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
