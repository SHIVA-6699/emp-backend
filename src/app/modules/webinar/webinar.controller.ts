import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import { WebinarService } from "./webinar.service";
import sendResponse from "../../utils/sendResponse";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../utils/cloudinary";

const createWebinar = catchAsync(async (req: Request, res: Response) => {
  const { title, description, category, subCategory } = req.body;
  const userId = req?.user?.id;
  let thumbnail;
  if (
    [title, description, category, subCategory].some(
      field => field.trim() === ""
    )
  ) {
    throw new AppError(StatusCodes.NOT_FOUND, "Could not found all fields");
  }
  const thumbnailLocalPath = req.file?.path;

  if (!thumbnailLocalPath) {
    throw new AppError(StatusCodes.NOT_FOUND, "Could not find thumbnail");
  }

  try {
    thumbnail = await uploadOnCloudinary(thumbnailLocalPath, "webinars");

    if (!thumbnail) {
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went wrong while uploading thumbnail"
      );
    }

    const webinarObject = {
      title,
      description,
      category,
      subCategory,
      thumbnail: {
        secure_url: thumbnail.secure_url,
        public_url: thumbnail.url,
        public_id: thumbnail.public_id,
      },
      authorId: userId || "4f432a13-3950-45b7-8feb-514010c5b97a",
    };

    const response = await WebinarService.create(webinarObject);

    sendResponse(res, {
      data: response,
      message: "Webinar Created Successfully",
      success: true,
      statusCode: StatusCodes.CREATED,
    });
  } catch (error) {
    await deleteFromCloudinary(thumbnail?.public_id as string, "image");
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating webinar"
    );
  }
});

const getAllWebinars = catchAsync(async (req: Request, res: Response) => {
  try {
    const response = await WebinarService.getAll();
    sendResponse(res, {
      data: response,
      message: "Webinar Fetched Successfully",
      success: true,
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating webinar"
    );
  }
});

const getWebinarById = catchAsync(async (req: Request, res: Response) => {
  const { slug} = req.params;
  if (!slug) {
    throw new AppError(StatusCodes.NOT_FOUND, "Webinar Id Not Found");
  }
  const response = await WebinarService.getAWebinarById(slug);
  sendResponse(res, {
    data: response,
    message: "Webinars Fetched Successfully",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

const deleteWebinar = catchAsync(async (req: Request, res: Response) => {
  const { webinarId } = req.body;
  if (!webinarId) {
    throw new AppError(StatusCodes.NOT_FOUND, "Webinar Id Not Found");
  }
  const response = await WebinarService.deleteWebinar(webinarId);
  sendResponse(res, {
    data: response,
    message: "Webinars Deleted Successfully",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

export const WebinarController = {
  createWebinar,
  getAllWebinars,
  getWebinarById,
  deleteWebinar,
};
