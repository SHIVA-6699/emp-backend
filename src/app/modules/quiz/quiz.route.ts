import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createQuizValidationSchema } from "./quiz.validation";
import QuizController from "./quiz.controller";

const router = Router();

// create quiz : POST
router.post(
  "/",
  validateRequest(createQuizValidationSchema),
  QuizController.createQuiz
);

const QuizRoute = router;
export default QuizRoute;
