import { SetMetadata } from '@nestjs/common';

export const verificationTypes = ['sign-in', 'sign-up', 'forgot-password'] as const;
export type VerificationTypeValue = (typeof verificationTypes)[number];
export const VERIFICATION_TYPE_KEY = 'verification-type';
export const VerificationAction = (type: VerificationTypeValue) => SetMetadata(VERIFICATION_TYPE_KEY, type);
