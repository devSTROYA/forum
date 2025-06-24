import { UAParser } from 'ua-parser-js';

export class UserAgent {
  static parse(userAgent: string): UAParser.IResult {
    const parser = new UAParser(userAgent);

    return parser.getResult();
  }
}
