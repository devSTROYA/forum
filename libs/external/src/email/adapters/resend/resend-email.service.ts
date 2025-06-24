import { EnvService } from '@app/env';
import { AppLogger } from '@app/logger';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Resend } from 'resend';

import { ResendSchemaEnv } from '@config/email';
import { EmailDTO } from '../../dtos';
import { EmailModule } from '../../email.module';
import { EmailService } from '../../email.service';

@Injectable()
export class ResendEmailService extends Resend implements EmailService, OnModuleInit {
  private readonly logger = new AppLogger(EmailModule.name);

  constructor(private readonly emailConfig: EnvService<ResendSchemaEnv>) {
    super(emailConfig.get('RESEND_API_KEY'));
  }

  onModuleInit() {
    this.logger.log('Resend used.', EmailService.name);
  }

  async sendEmail(email: EmailDTO): Promise<boolean> {
    const { text, html, subject, to } = email;

    if (!text && !html) {
      throw new Error('One of text or html is required.');
    }

    const from = this.emailConfig.get('EMAIL_SENDER_ACCOUNT');

    try {
      const { error } = await this.emails.send({ from, to, subject, html, text });

      if (error) {
        this.logger.error(error.message);
        return false;
      }

      return true;
    } catch (err) {
      this.logger.error(err.message);
      return false;
    }
  }
}
