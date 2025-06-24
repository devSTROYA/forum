import { createHash, randomUUID } from 'crypto';

export class Encryption {
  static createSHA256Hash(payload: string): string {
    return createHash('sha256').update(payload).digest('hex');
  }

  static generateUUID(): string {
    return randomUUID();
  }
}
