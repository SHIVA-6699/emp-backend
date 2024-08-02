import { z } from "zod";
// create IRM validation schema
export const createIRMValidationSchema = z.object({
  body: z.object({}),
});
