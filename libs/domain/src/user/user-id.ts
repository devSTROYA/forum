import { UniqueEntityID } from '@core/domain';
import { Result, ResultType, Validation } from '@core/logic';
import { NanoID } from '@core/util';

export class UserId extends UniqueEntityID {
  private constructor(id: string) {
    super(id);
  }

  static create(id: string): ResultType<UserId> {
    const validateEmptyPropsResult = Validation.againstNullOrUndefined(id, 'User ID');

    if (validateEmptyPropsResult.isFailure()) {
      return Result.fail<UserId>(validateEmptyPropsResult.getErrorValue());
    }

    const userId = new UserId(id);

    return Result.ok<UserId>(userId);
  }

  static retrieve(id: string): UserId {
    return new UserId(id);
  }

  static generate(): UserId {
    return new UserId(NanoID.generate());
  }
}
