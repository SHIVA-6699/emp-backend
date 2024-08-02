import { z } from "zod";

export const createWebcastValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    videoLink: z.string(),
    category: z.string(),
    subCategory: z.string(),
  }),
});
