import { z } from "zod";

export const createQAndAValidationSchema = z.object({
  body: z.object({
    category: z.string(),
    title: z.string(),
    description: z.string(),
    file: z.any().optional(),
  }),
});
