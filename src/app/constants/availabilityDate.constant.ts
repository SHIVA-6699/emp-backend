export const AvailabilityDate = {
  WITHIN_A_WEEK: "WITHIN_A_WEEK",
  WITHIN_15_DAYS: "WITHIN_15_DAYS",
  WITHIN_A_MONTH: "WITHIN_A_MONTH",
  WITHIN_3_MONTHS: "WITHIN_3_MONTHS",
};

export type TAvailabilityDate =
  (typeof AvailabilityDate)[keyof typeof AvailabilityDate];
