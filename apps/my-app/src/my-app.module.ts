import { EnvModule, EnvService } from '@app/env';
import { FileUtil } from '@core/util';
import { DatabaseModule } from '@external/database';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';

import { JwtEnv, JwtEnvSchema } from '@config/jwt';
import { UserModule } from './modules/user';

@Module({
  imports: [
    CqrsModule.forRoot(),
    DatabaseModule.register('PRISMA'),
    UserModule,
    JwtModule.registerAsync({
      global: true,
      imports: [EnvModule.forRoot('JWT', JwtEnvSchema)],
      inject: [EnvService],
      useFactory: async (envService: EnvService<JwtEnv>) => {
        const [privateKey, publicKey] = await Promise.all([
          FileUtil.fileToBuffer(envService.get('JWT_PRIVATE_KEY_PATH')),
          FileUtil.fileToBuffer(envService.get('JWT_PUBLIC_KEY_PATH')),
        ]);

        return {
          privateKey,
          publicKey,
          signOptions: { algorithm: 'RS256', expiresIn: envService.get('JWT_ACCESS_EXPIRES_IN') },
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class MyAppModule {}
