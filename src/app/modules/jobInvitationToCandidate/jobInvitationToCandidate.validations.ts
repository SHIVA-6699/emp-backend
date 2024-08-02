import { z } from "zod";
import { Status } from "../jobAssignmentToSRM/jobAssignmentToSRM.constants";

export const inviteJobToCandidateValidationSchema = z.object({
  body: z.object({
    candidateIds: z.array(z.string()).min(1),
    jobAssignmentToSRMId: z.string(),
  }),
});

export const changeJobInvitationStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(Status),
  }),
});
