export const ValueChainStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type TValueChainStatus =
  (typeof ValueChainStatus)[keyof typeof ValueChainStatus];

export const ValueChainFilterableFields = ["status"];
