import { z } from "zod";

const arrayOfObject = z.object({
  value: z.string(),
  label: z.string(),
});

export const createInterviewValidationSchema = z.object({
  body: z.object({
    interviewId: z.string().optional(),
    jobDescription: z.string().optional(),
    jobRoles: z.array(arrayOfObject).optional(),
    skills: z.array(arrayOfObject).optional(),
    interviewTypes: z.array(arrayOfObject).optional(),
  }),
});
