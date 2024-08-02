import { z } from "zod";
// create BOA validation schema
export const createBOAValidationSchema = z.object({
  body: z.object({}),
});
