import { z } from "zod";

export const createPodcastValidationSchema = z.object({
  body: z.object({
    category: z.string(),
    title: z.string(),
    description: z.string(),
    file: z.any().optional(),
  }),
});
