import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { WebcastService } from "./webcast.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../utils/cloudinary";

const createWebcast = catchAsync(async (req: Request, res: Response) => {
  const { title, videoUrl, description, category, subCategory } = req.body;
  const userId = req?.user?.id || "4f432a13-3950-45b7-8feb-514010c5b97a";
  let thumbnail;
  if (
    [title, videoUrl, description, category, subCategory].some(
      x => x.trim() === ""
    )
  ) {
    throw new AppError(StatusCodes.NOT_FOUND, "All Fields are required");
  }

  const thumbnailLocalPath = req.file?.path;
  if (!thumbnailLocalPath) {
    throw new AppError(StatusCodes.NOT_FOUND, "Thumbnail Not Found");
  }
  try {
    thumbnail = await uploadOnCloudinary(thumbnailLocalPath, "webcasts");
    if (!thumbnail) {
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went wrong uploading the thumbnail"
      );
    }

    const dataObject = {
      title,
      description,
      thumbnail: {
        public_id: thumbnail.public_id,
        secure_url: thumbnail.secure_url,
        public_url: thumbnail.url,
      },
      category,
      subCategory,
      videoUrl,
      authorId: userId,
    };
    const response = await WebcastService.create(dataObject);
    sendResponse(res, {
      data: response,
      statusCode: StatusCodes.CREATED,
      message: "Webcast created successfully",
      success: true,
    });
  } catch (error) {
    await deleteFromCloudinary(thumbnail?.public_id as string, "image");
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating webcast"
    );
  }
});

const getAllWebcast = catchAsync(async (req: Request, res: Response) => {
  const response = await WebcastService.getAll();
  sendResponse(res, {
    data: response,
    statusCode: StatusCodes.OK,
    message: "Webcasts Fetched successfully",
    success: true,
  });
});

const getAWebcast = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params;
  const response = await WebcastService.getAWebcast(slug);
  sendResponse(res, {
    data: response,
    statusCode: StatusCodes.OK,
    message: "Webcast Fetched successfully",
    success: true,
  });
});

export const WebcastController = {
  createWebcast,
  getAWebcast,
  getAllWebcast,
};
