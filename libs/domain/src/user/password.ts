import { ValueObject } from '@core/domain';
import { Result, ResultType, Validation } from '@core/logic';
import { Bcrypt } from '@core/util';

type PasswordProps = {
  value: string;
  isHashed?: boolean;
};

export class Password extends ValueObject<PasswordProps> {
  get value(): string {
    return this.props.value;
  }

  get hashedValue(): string {
    return this.props.isHashed ? this.props.value : Bcrypt.hash(this.props.value);
  }

  get isHashed(): boolean {
    return this.props.isHashed;
  }

  private constructor(props: PasswordProps) {
    super(props);
  }

  static validate(value: string): ResultType<void> {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[^A-Za-z0-9]/;

    const isContainUppercase = uppercaseRegex.test(value);
    const isContainLowercase = lowercaseRegex.test(value);
    const isContainNumber = numberRegex.test(value);
    const isContainSpecialChar = specialCharRegex.test(value);

    if (!isContainUppercase || !isContainLowercase || !isContainNumber || !isContainSpecialChar) {
      return Result.fail<void>(
        'Password must contain at least one uppercase + one lowercase letter, one number, and one special character.'
      );
    }

    return Result.ok<void>();
  }

  verify(value: string): boolean {
    return Bcrypt.compare(value, this.props.value);
  }

  static create(value: string): ResultType<Password> {
    const validateTypeResult = Result.combine([
      Validation.againstNullOrUndefined(value, 'Password'),
      Validation.isCorrectType(value, 'Password', 'string'),
    ]);

    if (validateTypeResult.isFailure()) {
      return Result.fail<Password>(validateTypeResult.getErrorValue());
    }

    const validSizeResult = Validation.inRangeCharacters(value, 'Password', 6);

    if (validSizeResult.isFailure()) {
      return Result.fail<Password>(validSizeResult.getErrorValue());
    }

    const validatePasswordResult = this.validate(value);

    if (validatePasswordResult.isFailure()) {
      return Result.fail<Password>(validatePasswordResult.getErrorValue());
    }

    const password = new Password({
      value,
      isHashed: false,
    });

    return Result.ok<Password>(password);
  }

  static retrieve(value: string): Password {
    return new Password({
      value,
      isHashed: true,
    });
  }
}
