import { TCertificateAttributes } from "../../certificate/certificate.interface";
import { TExperienceAttributes } from "../../experience/experience.interface";

export interface TInterviewerAttributes {
  id?: string;
  userId: string;
  skills?: string[];
  experiences?: TExperienceAttributes[];
  certificates?: TCertificateAttributes[];
  createdAt?: string;
  updatedAt?: string;
}
