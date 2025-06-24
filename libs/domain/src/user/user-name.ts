import { ValueObject } from '@core/domain';
import { Result, ResultType, Validation } from '@core/logic';

type UserNameProps = {
  value: string;
};

export class UserName extends ValueObject<UserNameProps> {
  static maxLength: number = 30;
  static minLength: number = 2;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: UserNameProps) {
    super(props);
  }

  static create(value: string): ResultType<UserName> {
    const validateTypeResult = Result.combine([
      Validation.againstNullOrUndefined(value, 'User name'),
      Validation.isCorrectType(value, 'User name', 'string'),
    ]);

    if (validateTypeResult.isFailure()) {
      return Result.fail<UserName>(validateTypeResult.getErrorValue());
    }

    const validateLengthResult = Validation.inRangeCharacters(value, 'User name', this.minLength, this.maxLength);

    if (validateLengthResult.isFailure()) {
      return Result.fail<UserName>(validateLengthResult.getErrorValue());
    }

    const userName = new UserName({ value });

    return Result.ok<UserName>(userName);
  }

  static retrieve(value: string): UserName {
    return new UserName({ value });
  }
}
