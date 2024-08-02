import { TStatus } from "../jobAssignmentToSRM/jobAssignmentToSRM.interface";

export type TJobInvitationToCandidate = {
  id?: string;
  jobId: string;
  candidateId: string;
  srmId: string;
  jobAssignmentToSRMId: string;
  status: TStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type TInviteJobPayload = {
  candidateIds: string[];
  jobAssignmentToSRMId: string;
};

export type TJobInvitationFilters = {
  status: TStatus;
  jobAssignmentToSRMId: string;
};
