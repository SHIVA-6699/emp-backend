import { z } from "zod";
// create interviewer validation schema
export const createInterviewerValidationSchema = z.object({
  body: z.object({
    skills: z.array(z.string()).optional(),
  }),
});
