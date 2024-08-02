import { z } from "zod";

export const createAppliedJobValidation = z.object({
  body: z.object({
    jobId: z.string(),
    candidateId: z.string(),
  }),
});
