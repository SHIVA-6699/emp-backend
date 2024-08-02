import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import QuizTestResultService from "./quizTestResult.service";

// create quiz test result
const createQuizTestResult = catchAsync(async (req, res) => {
  const payload = req.body;
  const userEmail = req.user.email;
  const userId = req.user.id;
  const result = await QuizTestResultService.createQuizTestResult({
    userEmail,
    payload,
    userId,
  });
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Quiz test result created successfully.",
    data: result,
  });
});

const QuizTestResultController = {
  createQuizTestResult,
};
export default QuizTestResultController;
