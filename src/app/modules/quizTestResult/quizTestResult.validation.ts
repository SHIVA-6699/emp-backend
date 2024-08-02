import { z } from "zod";

const submittedQuizValidationSchema = z.object({
  id: z.string(),
  question: z.string(),
  correctOption: z.string(),
  selectedAns: z.string(),
  options: z.array(z.string()),
});

export const createQuizTestResultValidationSchema = z.object({
  body: z.object({
    lesson: z.string(),
    achievedMark: z.number(),
    totalMark: z.number(),
    quizzes: z.array(submittedQuizValidationSchema),
  }),
});
