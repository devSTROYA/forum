class Failure<L> {
  private readonly _tag = 'Failure';
  private readonly _error: L;

  getErrorValue(): L {
    return this._error;
  }

  constructor(error: L) {
    this._error = error;
  }

  isFailure(): this is Failure<L> {
    return this._tag === 'Failure';
  }
}
class Success<R> {
  private readonly _tag = 'Success';
  private readonly _value: R;

  getValue(): R {
    return this._value;
  }

  constructor(value?: R) {
    this._value = value;
  }

  isFailure(): this is Failure<R> {
    return this._tag !== 'Success';
  }
}

export type ResultType<T> = Failure<string> | Success<T>;
type ExtractValue<T> = T extends Success<infer U> ? U : never;

export const Result = {
  ok<U>(value?: U): ResultType<U> {
    return new Success(value);
  },
  fail<U>(error: string): ResultType<U> {
    return new Failure(error);
  },
  combine<T extends readonly ResultType<unknown>[]>(
    results: readonly [...T]
  ): ResultType<{ [K in keyof T]: ExtractValue<T[K]> }> {
    for (const result of results) {
      if (result.isFailure()) return result;
    }

    const values = results.map((r) => (r as Success<unknown>).getValue()) as {
      [K in keyof T]: ExtractValue<T[K]>;
    };

    return Result.ok(values);
  },
};
