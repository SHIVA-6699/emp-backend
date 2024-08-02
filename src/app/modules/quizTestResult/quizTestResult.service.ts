import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import Lesson from "../lesson/lesson.model";
import User from "../user/user.model";
import { TQuizTestResult } from "./quizTestResult.interface";
// import generateCertificate from "../../utils/generateCertificate";
import { TUserAttributes } from "../user/user.interface";
import QuizTestResult from "./quizTestResult.model";

// create quiz test result
const createQuizTestResult = async ({
  userEmail,
  payload,
  userId,
}: {
  userEmail: string;
  payload: TQuizTestResult;
  userId: string;
}) => {
  // check lesson is exist
  const isLessonExist = await Lesson.findOne({ where: { id: payload.lesson } });

  if (!isLessonExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "Lesson not founded.");
  }

  // check is user exist with email
  const isUserExist: TUserAttributes | null = await User.findOne({
    where: {
      email: userEmail,
    },
  });

  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not founded.");
  }

  /*  const certificateUrl = await generateCertificate({
    name: "John Doe",
    mark: "45",
  }); */

  const result = await QuizTestResult.create({
    ...payload,
    userId: userId,
  });

  if (!result) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Failed to create new quiz test result."
    );
  }

  return result;
};

const QuizTestResultService = {
  createQuizTestResult,
};

export default QuizTestResultService;
