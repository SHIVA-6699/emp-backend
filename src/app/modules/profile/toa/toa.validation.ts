import { z } from "zod";
// create TOA validation schema
export const createTOAValidationSchema = z.object({
  body: z.object({}),
});
