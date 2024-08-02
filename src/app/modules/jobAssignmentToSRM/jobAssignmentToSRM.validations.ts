import { z } from "zod";
import { Status } from "./jobAssignmentToSRM.constants";

export const assignJobToSRMValidationSchema = z.object({
  body: z.object({
    jobId: z.string(),
    srmIds: z.array(z.string()).min(1),
  }),
});

export const changeJobAssignmentStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(Status),
  }),
});
