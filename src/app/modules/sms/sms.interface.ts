// backend/interfaces/sms.interface.ts
export interface SmsVerificationAttributes {
  id?: string;
  phoneNumber: string;
  otp: string;
  createdAt?: Date;
  updatedAt?: Date;
}
