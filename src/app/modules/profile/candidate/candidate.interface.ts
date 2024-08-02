import { TAvailabilityDate } from "../../../constants/availabilityDate.constant";
import { TEngagementType } from "../../../constants/engagementType.constant";
import { TLocationType } from "../../../constants/locationType.constant";
import { TPaymentType } from "../../../constants/paymentType.constant";
import { TWorkPermitType } from "../../../constants/workPermit.constant";
import { TSkillAttributes } from "../../skill/skill.interface";

export type TCandidateAttributes = {
  id?: string;
  userId?: string;
  skills?: TSkillAttributes[] | string[];
  experience_level: string;
  work_model: TLocationType;
  work_permit: TWorkPermitType;
  bill_rate: number;
  payment_type: TPaymentType;
  relocation: boolean;
  experiences?: string[];
  certificates?: string[];
  video_resume?: string;
  availability_date: TAvailabilityDate;
  engagement_type: TEngagementType;
  createdAt?: string;
  updatedAt?: string;
};
