export const EngagementType = {
  CONTRACTOR_C2C: "CONTRACTOR_C2C",
  CONTRACTOR_1099: "CONTRACTOR_1099",
  FULL_TIME_W2: "FULL_TIME_W2",
  PART_TIME_4_HOURS_PER_DAY: "PART_TIME_4_HOURS_PER_DAY",
  CONTRACTOR_TO_HIRE: "CONTRACTOR_TO_HIRE",
  ANY: "ANY",
} as const;

export type TEngagementType =
  (typeof EngagementType)[keyof typeof EngagementType];
