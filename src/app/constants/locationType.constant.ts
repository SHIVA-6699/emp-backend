export const LocationType = {
  ON_SITE: "ON_SITE",
  REMOTE: "REMOTE",
  HYBRID: "HYBRID",
  ANY: "ANY",
} as const;

export type TLocationType = (typeof LocationType)[keyof typeof LocationType];
