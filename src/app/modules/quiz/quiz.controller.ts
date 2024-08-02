import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import QuizService from "./quiz.service";

const createQuiz = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await QuizService.createQuiz(payload);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Quiz create successfully.",
    data: result,
  });
});

const QuizController = {
  createQuiz,
};
export default QuizController;
