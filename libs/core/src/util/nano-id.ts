import { customAlphabet } from 'nanoid';

export class NanoID {
  static readonly alphanumeric = '1234567890abcdefghijklmnopqrstuvwxyz';

  static generate(size?: number): string {
    const nanoid = customAlphabet(this.alphanumeric, size);

    return nanoid();
  }
}
