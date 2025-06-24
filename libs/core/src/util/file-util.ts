import { readFile } from 'fs/promises';

export class FileUtil {
  static fileToBuffer(filePath: string): Promise<Buffer> {
    return readFile(filePath, {});
  }

  static fileToUTF8String(filePath: string): Promise<string> {
    return readFile(filePath, { encoding: 'utf-8' });
  }
}
