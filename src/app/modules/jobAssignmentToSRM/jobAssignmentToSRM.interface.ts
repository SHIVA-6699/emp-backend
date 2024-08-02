export type TStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export type TJobAssignmentToSRM = {
  id?: string;
  jobId: string;
  srmId: string;
  crmId: string;
  status: TStatus;
  createdAt?: string;
  updatedAt?: Date;
};

export type TJobAssignmentInputProps = {
  jobId: string;
  srmIds: string[];
};

export type TJobAssignmentFilters = {
  status: TStatus;
  jobId: string;
};
