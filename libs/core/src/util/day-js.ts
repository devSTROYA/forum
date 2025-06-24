import * as dayjs from 'dayjs';

export class DayJS {
  static dateToString(format: string, value?: Date | string | number): string {
    const result = dayjs(value).format(format);

    return result;
  }
}
