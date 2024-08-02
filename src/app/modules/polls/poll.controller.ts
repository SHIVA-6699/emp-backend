import { Request, Response } from "express";
import { PollService } from "./poll.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";

const createPoll = catchAsync(async (req: Request, res: Response) => {
  const { question } = req.body;
  const response = await PollService.create(question);
  sendResponse(res, {
    data: { poll: response },
    message: "Poll Created Successfully",
    statusCode: StatusCodes.CREATED,
    success: true,
  });
});

const getAllPolls = catchAsync(async (req: Request, res: Response) => {
  const response = await PollService.getAll();
  sendResponse(res, {
    data: response,
    message: "Poll Fetched Successfully",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

export const PollController = {
  createPoll,
  getAllPolls,
};
