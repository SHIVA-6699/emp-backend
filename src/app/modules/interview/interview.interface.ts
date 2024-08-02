import { Optional } from "sequelize";
export interface TLabelValuePair {
  label: string;
  value: string;
}
export interface TInterviewAttributes {
  id: string;
  userId: string;
  interviewId: string;
  jobDescription: string;
  skills: TLabelValuePair[];
  jobRoles: TLabelValuePair[];
  interviewTypes: TLabelValuePair[];
}

export interface TInterviewInput extends Optional<TInterviewAttributes, "id"> {}
export interface TInterviewOutput extends Required<TInterviewAttributes> {}
