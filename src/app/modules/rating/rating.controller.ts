import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { RatingService } from "./rating.service";
import sendResponse from "../../utils/sendResponse";

const addRating = catchAsync(async (req: Request, res: Response) => {
  const { contentId, rating } = req.body;
  const userId = req?.user?.id || "4f432a13-3950-45b7-8feb-514010c5b97a";
  if (!contentId || !rating) {
    throw new AppError(
      StatusCodes.NOT_ACCEPTABLE,
      "ContentId and Rating Required"
    );
  }
  const response = await RatingService.addRating({
    rating,
    contentId,
    userId,
  });
  sendResponse(res, {
    data: response,
    message: "Ratings Added",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const getContentRatingsCount = catchAsync(
  async (req: Request, res: Response) => {
    const { contentId } = req.params;
    if (!contentId) {
      throw new AppError(StatusCodes.NOT_ACCEPTABLE, "Content Id Not Found");
    }
    const response = await RatingService.contentRatingCount(contentId);
    sendResponse(res, {
      data: { ratingCount: response },
      statusCode: StatusCodes.OK,
      success: true,
      message: "Fetched Successfully",
    });
  }
);


export const RatingController = {
  addRating,
  getContentRatingsCount,
};
