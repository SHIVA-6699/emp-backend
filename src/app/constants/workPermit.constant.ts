export const WorkPermit = {
  H1_B: "H1_B",
  GREEN_CARD: "GREEN_CARD",
  US_CITIZEN: "US_CITIZEN",
  ANY: "ANY",
} as const;

export type TWorkPermitType = (typeof WorkPermit)[keyof typeof WorkPermit];
