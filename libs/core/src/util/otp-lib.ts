import { hotp } from 'otplib';

export class OtpLib {
  static readonly COUNTER = 100;

  static generate(secret: string): string {
    return hotp.generate(secret, OtpLib.COUNTER);
  }

  static validate(secret: string, otp: string): boolean {
    return hotp.check(otp, secret, OtpLib.COUNTER);
  }
}
