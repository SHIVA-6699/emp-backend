export const Role = {
  USER: "USER",
  CANDIDATE: "CANDIDATE",
  INTERVIEWER: "INTERVIEWER",
  CUSTOMER: "CUSTOMER",
  SERVICE_PROVIDER_COMPANY: "SERVICE_PROVIDER_COMPANY",
  CRM: "CRM",
  SRM: "SRM",
  IRM: "IRM",
  FOA: "FOA",
  BOA: "BOA",
  TOA: "TOA",
  INVESTOR: "INVESTOR",
  SUPER_ADMIN: "SUPER_ADMIN",
};

export type TRoleType = (typeof Role)[keyof typeof Role];
