export const PaymentType = {
  HOURLY: "HOURLY",
  ANNUALLY: "ANNUALLY",
} as const;

export type TPaymentType = (typeof PaymentType)[keyof typeof PaymentType];
