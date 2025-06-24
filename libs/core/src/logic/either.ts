class Left<L = unknown> {
  private readonly _tag = 'Left';
  private readonly _error: L;

  get error(): L {
    return this._error;
  }

  constructor(error: L) {
    this._error = error;
  }

  isLeft(): this is Left {
    return this._tag === 'Left';
  }
}

class Right<R = unknown> {
  private readonly _tag = 'Right';
  private readonly _value: R;

  get value(): R {
    return this._value;
  }

  constructor(value: R) {
    this._value = value;
  }

  isLeft(): this is Left {
    return this._tag !== 'Right';
  }
}

export type Either<L, R> = Left<L> | Right<R>;

export const left = <L, R>(error: L): Either<L, R> => {
  return new Left(error);
};

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value);
};
