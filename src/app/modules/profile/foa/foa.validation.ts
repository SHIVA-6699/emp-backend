import { z } from "zod";
// create FOA validation schema
export const createFOAValidationSchema = z.object({
  body: z.object({}),
});
