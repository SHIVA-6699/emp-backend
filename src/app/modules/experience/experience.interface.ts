import { TEmploymentType } from "../../constants/employmentType.constant";
import { TLocationType } from "../../constants/locationType.constant";
import { TSkillAttributes } from "../skill/skill.interface";

export type TExperienceAttributes = {
  id?: string;
  title: string;
  employment_type: TEmploymentType;
  location_type: TLocationType;
  company_name: string;
  location: string;
  start_date: string;
  end_date?: string;
  isWorking?: boolean;
  candidateId?: string;
  skills?: TSkillAttributes[] | string[];
  media?: string[];
  createdAt?: string;
  updatedAt?: string;
};
