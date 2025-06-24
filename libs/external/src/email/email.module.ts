import { EnvModule } from '@app/env';
import { ResendEnvSchema } from '@config/email';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Resend } from 'resend';

import { ResendEmailService } from './adapters/resend';
import { EmailOptions } from './email.options';
import { EmailService } from './email.service';

type EmailServiceType = typeof ResendEmailService;

@Module({})
export class EmailModule {
  static register(options: EmailOptions, isGlobal?: boolean): DynamicModule {
    let dynamicEmailService: EmailServiceType;

    switch (options) {
      case 'RESEND':
        dynamicEmailService = ResendEmailService;
        break;
      default:
        throw new Error('Invalid email type.');
    }

    const privateProviders: Provider[] = [Resend];
    const sharedProviders: Provider[] = [
      {
        provide: EmailService,
        useClass: dynamicEmailService,
      },
    ];

    return {
      global: isGlobal ?? false,
      module: EmailModule,
      imports: [EnvModule.forRoot('Email', ResendEnvSchema)],
      controllers: [],
      providers: [...sharedProviders, ...privateProviders],
      exports: [...sharedProviders],
    };
  }
}
