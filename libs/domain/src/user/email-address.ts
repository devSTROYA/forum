import { ValueObject } from '@core/domain';
import { Result, ResultType, Validation } from '@core/logic';

type EmailAddressProps = {
  value: string;
};

export class EmailAddress extends ValueObject<EmailAddressProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: EmailAddressProps) {
    super(props);
  }

  static create(value: string): ResultType<EmailAddress> {
    const validateTypeResult = Result.combine([
      Validation.againstNullOrUndefined(value, 'Email address'),
      Validation.isCorrectType(value, 'Email address', 'string'),
    ]);

    if (validateTypeResult.isFailure()) {
      return Result.fail<EmailAddress>(validateTypeResult.getErrorValue());
    }

    const validateEmailFormatResult = Validation.isValidEmail(value);

    if (validateEmailFormatResult.isFailure()) {
      return Result.fail<EmailAddress>(validateEmailFormatResult.getErrorValue());
    }

    const emailAddress = new EmailAddress({ value });

    return Result.ok<EmailAddress>(emailAddress);
  }

  static retrieve(value: string): EmailAddress {
    return new EmailAddress({ value });
  }
}
