import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { InterviewService } from "./interview.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { generateRandomId } from "../../utils/generateRandomId";

const createInterview = catchAsync(async (req: Request, res: Response) => {
  try {
    const interviewData = req.body;
    const userId = req.user?.id;
    const interviewId = interviewData.interviewId || generateRandomId();
    const response = await InterviewService.create({
      ...interviewData,
      interviewId,
      userId,
    });
    return sendResponse(res, {
      data: response,
      statusCode: StatusCodes.CREATED,
      message: "Interview created successfully",
      success: true,
    });
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating Interview"
    );
  }
});

const getAllInterviews = catchAsync(async (req: Request, res: Response) => {
  try {
    const response = await InterviewService.getAll();
    return sendResponse(res, {
      data: response,
      statusCode: StatusCodes.CREATED,
      message: "Interviews fetched successfully",
      success: true,
    });
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while getting Interviews"
    );
  }
});

const getInterviewDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await InterviewService.getDetails(id);
    return sendResponse(res, {
      data: response,
      message: "Interview Fetched Successfully",
      statusCode: StatusCodes.OK,
      success: true,
    });
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while getting Interview."
    );
  }
});

export const InterviewController = {
  createInterview,
  getAllInterviews,
  getInterviewDetails,
};
