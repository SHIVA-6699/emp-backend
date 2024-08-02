import { z } from "zod";
const arrayOfObject = z.object({
  value: z.string(),
  label: z.string(),
});
export const createJobValidationSchema = z.object({
  body: z.object({
    jobRole: z.string(),
    jobDescription: z.string(),
    skills: z.array(arrayOfObject).optional(),
    experienceLevels: z.array(arrayOfObject).optional(),
    paymentType: z.string().optional(),
    paymentRanges: z.array(arrayOfObject).optional(),
    volume: z.number().or(z.string()).optional(),
    workPermits: z.array(arrayOfObject).optional(),
    customerEngagementTypes: z.array(arrayOfObject).optional(),
    empowerBondTypes: z.array(arrayOfObject).optional(),
    workModels: z.array(arrayOfObject).optional(),
    country: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    zipCode: z.string().optional(),
    startDates: z.array(arrayOfObject).optional(),
    durations: z.array(arrayOfObject).optional(),
    interviewModels: z.array(arrayOfObject).optional(),
  }),
});
