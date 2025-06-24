import { extension, lookup } from 'mime-types';

export class MimeTypes {
  static getContentType(filenameOrExt: string): string {
    return lookup(filenameOrExt) || '';
  }

  static getExtension(contentType: string): string {
    return extension(contentType) || '';
  }
}
