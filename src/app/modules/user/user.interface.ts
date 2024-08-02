import Candidate from "../profile/candidate/candidate.model";
import CRM from "../profile/crm/crm.model";
import SRM from "../profile/srm/srm.model";
import { TRoleType } from "./user.constant";

export type TUserAttributes = {
  id?: string;
  email: string;
  password: string;
  roles: TRoleType[];
  current_role: TRoleType;
  email_verified?: boolean;
  crmProfile?: CRM;
  SRMProfile?: SRM;
  candidateProfile?: Candidate;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
