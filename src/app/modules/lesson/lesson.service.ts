import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TLessonInput } from "./lesson.interface";
import Lesson from "./lesson.model";
import Quiz from "../quiz/quiz.model";

const create = async (payload: TLessonInput) => {
  try {
    const result = await Lesson.create(payload);
    return result.dataValues;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating lesson."
    );
  }
};

const getAllLessons = async (query: Record<string, unknown>) => {
  const { category } = query;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const queryOptions: { where?: { category: string }; order?: any } = {};
  if (category) {
    queryOptions.where = { category: category as string };
  }

  queryOptions.order = [["createdAt", "DESC"]];

  const result = await Lesson.findAll(queryOptions);
  return result;
};

// get a single lesson
const getLessonById = async (payload: string) => {
  const result = await Lesson.findOne({
    where: { slug: payload },
    include: [{ model: Quiz, as: "quizzes" }],
  });
  if (!result) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while getting all lessons"
    );
  }
  return result;
};

// get recent lesson
const getRecentLessons = async () => {
  try {
    const result = await Lesson.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
    });
    if (!result || result.length === 0) {
      throw new AppError(StatusCodes.NOT_FOUND, "No recent lessons found");
    }

    return result;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while fetching recent lessons"
    );
  }
};

// get total lesson count
const getTotalLessonsCount = async () => {
  const result = await Lesson.findAndCountAll();
  if (!result) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while fetching recent lessons"
    );
  }
  return result.count;
};

// lessons quizzes
const getAllLessonsQuizzes = async () => {
  const result = await Lesson.findAll({
    include: { model: Quiz, as: "quizzes" },
  });
  return result;
};

export const LessonService = {
  create,
  getAllLessons,
  getLessonById,
  getRecentLessons,
  getTotalLessonsCount,
  getAllLessonsQuizzes,
};
