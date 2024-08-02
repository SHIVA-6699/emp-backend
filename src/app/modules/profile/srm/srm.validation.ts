import { z } from "zod";
// create SRM validation schema
export const createSRMValidationSchema = z.object({
  body: z.object({}),
});
