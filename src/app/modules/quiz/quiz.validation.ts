import { z } from "zod";
import { QuestionType, RedoQuiz } from "./quiz.constant";

export const createQuizValidationSchema = z.object({
  body: z.object({
    lesson: z.string().optional(),
    question: z.string(),
    options: z.array(z.string()),
    correctOption: z.string(),
    questionType: z.enum(QuestionType as [string, ...string[]]),
    redoQuiz: z.enum(RedoQuiz as [string, ...string[]]),
    timer: z.number(),
  }),
});
