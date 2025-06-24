import { compareSync, hashSync } from 'bcrypt';

export class Bcrypt {
  static hash(value: string): string {
    return hashSync(value, 10);
  }

  static compare(value: string, hashedValue: string): boolean {
    return compareSync(value, hashedValue);
  }
}
