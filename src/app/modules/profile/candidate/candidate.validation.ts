import { AvailabilityDate } from "../../../constants/availabilityDate.constant";
import { EngagementType } from "../../../constants/engagementType.constant";
import { PaymentType } from "../../../constants/paymentType.constant";
import { LocationType } from "../../../constants/locationType.constant";
import { WorkPermit } from "../../../constants/workPermit.constant";
import { z } from "zod";
import {
  addExperienceValidationSchema,
  updateExperienceValidationSchema,
} from "../../experience/experience.validation";

export const createCandidateValidationSchema = z.object({
  body: z.object({}),
});

export const updateCandidateValidationSchema = z.object({
  body: z.object({
    availability_date: z
      .enum(Object.values(AvailabilityDate) as [string, ...string[]])
      .optional(),
    bill_rate: z.number().optional(),
    engagement_type: z
      .enum(Object.values(EngagementType) as [string, ...string[]])
      .optional(),
    experience_level: z.string().optional(),
    payment_type: z
      .enum(Object.values(PaymentType) as [string, ...string[]])
      .optional(),
    work_model: z
      .enum(Object.values(LocationType) as [string, ...string[]])
      .optional(),
    work_permit: z
      .enum(Object.values(WorkPermit) as [string, ...string[]])
      .optional(),
    relocation: z.boolean().optional(),
    skills: z.array(z.string()).optional(),
  }),
});

export const addCandidateExperienceValidationSchema = z.object({
  body: addExperienceValidationSchema,
});

export const updateCandidateExperienceValidationSchema = z.object({
  body: updateExperienceValidationSchema,
});
