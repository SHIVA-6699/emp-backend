export const EmploymentType = {
  FULL_TIME: "FULL_TIME",
  PART_TIME: "PART_TIME",
  CONTRACT: "CONTRACT",
  INTERNSHIP: "INTERNSHIP",
  FREELANCE: "FREELANCE",
  SELF_EMPLOYED: "SELF_EMPLOYED",
};

export type TEmploymentType =
  (typeof EmploymentType)[keyof typeof EmploymentType];
