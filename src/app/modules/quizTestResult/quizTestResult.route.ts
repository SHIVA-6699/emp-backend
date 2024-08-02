import { Router } from "express";
import auth from "../../middlewares/auth";
import QuizTestResultController from "./quizTestResult.controller";
import validateRequest from "../../middlewares/validateRequest";
import { createQuizTestResultValidationSchema } from "./quizTestResult.validation";

const router = Router();

// create quiz test result route : POST
router.post(
  "/create",
  auth(),
  validateRequest(createQuizTestResultValidationSchema),
  QuizTestResultController.createQuizTestResult
);
const QuizTestResultRoute = router;
export default QuizTestResultRoute;
