import { z } from "zod";
// create crm validation schema
export const createCRMValidationSchema = z.object({
  body: z.object({}),
});
