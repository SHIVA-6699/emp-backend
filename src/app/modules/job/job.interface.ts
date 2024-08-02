import { Optional } from "sequelize";
export type TJobStatus = "ACTIVE" | "INACTIVE";
export interface TLabelValuePair {
  label: string;
  value: string;
}
export interface TJobAttributes {
  id?: string;
  userId: string;
  jobId: string;
  status: TJobStatus;
  jobRole: string;
  jobDescription: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  customerEngagementTypes?: TLabelValuePair[];
  durations?: TLabelValuePair[];
  empowerBondTypes?: TLabelValuePair[];
  experienceLevels?: TLabelValuePair[];
  paymentRanges?: TLabelValuePair[];
  paymentType?: string;
  skills?: TLabelValuePair[];
  startDates?: TLabelValuePair[];
  volume?: number;
  workModels?: TLabelValuePair[];
  workPermits?: TLabelValuePair[];
  interviewModels?: TLabelValuePair[];
}

export interface TJobInput extends Optional<TJobAttributes, "id"> {}
export interface TJobOutput extends TJobAttributes {
  alreadyApplied?: boolean;
}
