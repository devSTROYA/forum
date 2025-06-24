import { EmailDTO } from './dtos';

export abstract class EmailService {
  abstract sendEmail(email: EmailDTO): Promise<boolean>;
}
