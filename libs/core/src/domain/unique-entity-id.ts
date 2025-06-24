import { randomUUID } from 'crypto';

class Identifier<T> {
  constructor(private value: T) {
    this.value = value;
  }

  isEquals(id?: Identifier<T>): boolean {
    if (id == null || id == undefined) return false;
    if (!(id instanceof this.constructor)) return false;

    return id.toValue() === this.value;
  }

  toString() {
    return String(this.value);
  }

  toValue(): T {
    return this.value;
  }
}

export class UniqueEntityID extends Identifier<string | number> {
  constructor(id?: string | number) {
    // ^ UUID as default;
    super(id ? id : randomUUID());
  }
}
