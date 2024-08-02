import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppliedJobServices from "./appliedJob.services";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const applyToJob = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const response = await AppliedJobServices.applyToJob(payload);
  sendResponse(res, {
    data: response,
    message: "Applied To Job Successfully",
    statusCode: StatusCodes.CREATED,
    success: true,
  });
});

export const AppliedJobControllers = {
  applyToJob,
};
