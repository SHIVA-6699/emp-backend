import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../utils/cloudinary";
import sendResponse from "../../utils/sendResponse";
import { ResearchAndDevelopmentService } from "./researchAndDevelopment.service";

const createResearchAndDevelopment = catchAsync(
  async (req: Request, res: Response) => {
    const { title, content, category, subCategory } = req.body;
    // thumbnail file path
    const thumbnailLocalPath = req.file?.path;

    let thumbnail;
    if (!thumbnailLocalPath) {
      throw new AppError(StatusCodes.NOT_FOUND, "Thumbnail file not found");
    }
    try {
      // uploading on cloudinary
      thumbnail = await uploadOnCloudinary(
        thumbnailLocalPath,
        "ResearchAndDevelopments"
      );

      if (!thumbnail) {
        throw new AppError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          "Something went wrong while uploading thumbnail"
        );
      }
      const ResearchAndDevelopment = {
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
      // creating ResearchAndDevelopment

      const result = await ResearchAndDevelopmentService.create(
        ResearchAndDevelopment
      );

      sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "ResearchAndDevelopment Uploaded Successfully",
        data: { data: result },
      });
    } catch (error) {
      await deleteFromCloudinary(thumbnail?.public_id as string, "image");
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went wrong while creating ResearchAndDevelopment"
      );
    }
  }
);

// get all ResearchAndDevelopments
const getAllResearchAndDevelopments = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query;
    const result =
      await ResearchAndDevelopmentService.getAllResearchAndDevelopments(query);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "ResearchAndDevelopment Fetched Successfully",
      data: result,
    });
  }
);

// get single ResearchAndDevelopment by id
const getResearchAndDevelopmentById = catchAsync(
  async (req: Request, res: Response) => {
    const { slug } = req.params;
    const result =
      await ResearchAndDevelopmentService.getResearchAndDevelopmentById(slug);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "ResearchAndDevelopments Fetched Successfully",
      data: result,
    });
  }
);

// get recent ResearchAndDevelopment by uploaded date order
const getRecentResearchAndDevelopments = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await ResearchAndDevelopmentService.getRecentResearchAndDevelopments();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Recent ResearchAndDevelopments Fetched Successfully",
      data: result,
    });
  }
);

// get all ResearchAndDevelopment count
const getTotalResearchAndDevelopmentCount = catchAsync(
  async (req: Request, res: Response) => {
    const ResearchAndDevelopmentCount =
      await ResearchAndDevelopmentService.getTotalResearchAndDevelopmentCount();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Recent ResearchAndDevelopments Fetched Successfully",
      data: { ResearchAndDevelopmentCount },
    });
  }
);

export const ResearchAndDevelopmentController = {
  createResearchAndDevelopment,
  getAllResearchAndDevelopments,
  getResearchAndDevelopmentById,
  getRecentResearchAndDevelopments,
  getTotalResearchAndDevelopmentCount,
};
