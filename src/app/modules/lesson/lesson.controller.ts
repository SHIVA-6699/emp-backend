import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../utils/cloudinary";
import { LessonService } from "./lesson.service";
import sendResponse from "../../utils/sendResponse";

const createLesson = catchAsync(async (req: Request, res: Response) => {
  const { title, content, category, subCategory } = req.body;
  // thumbnail file path
  const thumbnailLocalPath = req.file?.path;
  let thumbnail;
  if (!thumbnailLocalPath) {
    throw new AppError(StatusCodes.NOT_FOUND, "Thumbnail file not found");
  }
  try {
    // uploading on cloudinary
    thumbnail = await uploadOnCloudinary(thumbnailLocalPath, "lessons");

    if (!thumbnail) {
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went wrong while uploading thumbnail"
      );
    }
    const lesson = {
      title,
      thumbnail: {
        secure_url: thumbnail.secure_url,
        public_id: thumbnail.public_id,
        public_url: thumbnail.url,
      },
      content,
      category,
      subCategory,
      authorId: req?.user?.id || "4f432a13-3950-45b7-8feb-514010c5b97a",
    };
    // creating lesson
    const result = await LessonService.create(lesson);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Lesson Uploaded Successfully",
      data: { data: result },
    });
  } catch (error) {
    await deleteFromCloudinary(thumbnail?.public_id as string, "image");
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating lesson"
    );
  }
});

// get all lessons
const getAllLessons = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const result = await LessonService.getAllLessons(query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Lesson Fetched Successfully",
    data: result,
  });
});

// get single lesson by id
const getLessonById = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const result = await LessonService.getLessonById(slug);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Lessons Fetched Successfully",
    data: result,
  });
});

// get recent lesson by uploaded date order
const getRecentLessons = catchAsync(async (req: Request, res: Response) => {
  const result = await LessonService.getRecentLessons();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Recent Lessons Fetched Successfully",
    data: result,
  });
});

// get all lesson count
const getTotalLessonCount = catchAsync(async (req: Request, res: Response) => {
  const lessonCount = await LessonService.getTotalLessonsCount();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Recent Lessons Fetched Successfully",
    data: { lessonCount },
  });
});

// get all lessons quizzes
const getAllLessonsQuizzes = catchAsync(async (req, res) => {
  const result = await LessonService.getAllLessonsQuizzes();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "All quizzes of lessons retrieved.",
    data: result,
  });
});

export const LessonController = {
  createLesson,
  getAllLessons,
  getLessonById,
  getRecentLessons,
  getTotalLessonCount,
  getAllLessonsQuizzes,
};
