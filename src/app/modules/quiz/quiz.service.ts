import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TQuiz } from "./quiz.interfac";
import Quiz from "./quiz.model";

// create quiz
const createQuiz = async (payload: TQuiz) => {
  // check is lesson exist ⚠️⚠️⚠️

  const result = await Quiz.create(payload);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Failed to create quiz.");
  }
  return result.dataValues;
};

const QuizService = {
  createQuiz,
};

export default QuizService;
