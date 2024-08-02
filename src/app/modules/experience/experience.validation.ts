import { z } from "zod";
import { EmploymentType } from "../../constants/employmentType.constant";
import { LocationType } from "../../constants/locationType.constant";

export const addExperienceValidationSchema = z.object({
  company_name: z.string(),
  employment_type: z.enum(
    Object.values(EmploymentType) as [string, ...string[]]
  ),
  location_type: z.enum(Object.values(LocationType) as [string, ...string[]]),
  start_date: z.coerce.date(),
  end_date: z.coerce.date().optional(),
  title: z.string(),
  isWorking: z.boolean(),
  media: z.unknown().optional(),
  skills: z.array(z.string()).optional(),
  location: z.string().optional(),
});
export const updateExperienceValidationSchema = z.object({
  company_name: z.string().optional(),
  employment_type: z
    .enum(Object.values(EmploymentType) as [string, ...string[]])
    .optional(),
  location_type: z
    .enum(Object.values(LocationType) as [string, ...string[]])
    .optional(),
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional().optional(),
  title: z.string().optional(),
  isWorking: z.boolean().optional(),
  media: z.unknown().optional(),
  skills: z.array(z.string()).optional(),
  location: z.string().optional(),
});
