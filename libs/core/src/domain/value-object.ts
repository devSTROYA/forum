import { ShallowEqual } from '@core/util';

export abstract class ValueObject<T extends Record<string, any>> {
  protected readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  isEquals(valueObject: ValueObject<T>): boolean {
    if (valueObject === null || valueObject === undefined) {
      return false;
    }

    if (valueObject.props === undefined) {
      return false;
    }

    return ShallowEqual.compareObject(this.props, valueObject.props);
  }
}
