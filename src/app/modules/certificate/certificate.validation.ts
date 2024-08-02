import { z } from "zod";

export const certificateValidationSchema = z.object({
  name: z.string(),
  credential_id: z.string().optional(),
  credential_url: z.string().optional(),
  issuing_date: z.date().optional(),
  issuing_organization: z.string(),
  expiry_date: z.date().optional(),
});
