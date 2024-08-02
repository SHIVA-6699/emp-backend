import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { JobService } from "./job.service";
import sendResponse from "../../utils/sendResponse";
import { generateRandomId } from "../../utils/generateRandomId";

const createJob = catchAsync(async (req: Request, res: Response) => {
  try {
    const jobData = req.body;
    const userId = req?.user?.id;
    const jobId = jobData?.jobId || generateRandomId();
    const response = await JobService.create({ ...jobData, userId, jobId });
    return sendResponse(res, {
      data: response,
      message: "Job Created Successfully",
      statusCode: StatusCodes.CREATED,
      success: true,
    });
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating job."
    );
  }
});

const getAllJobs = catchAsync(async (_, res: Response) => {
  try {
    const response = await JobService.getAll();
    return sendResponse(res, {
      data: response,
      message: "Job Fetched Successfully",
      statusCode: StatusCodes.OK,
      success: true,
    });
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while getting jobs."
    );
  }
});

const getJobDetails = catchAsync(async (req: Request, res: Response) => {
  const { id: jobId } = req.params;
  const userId = req?.user?.id;

  const response = await JobService.getDetails({ jobId, userId });
  return sendResponse(res, {
    data: response,
    message: "Job Fetched Successfully",
    statusCode: StatusCodes.OK,
    success: true,
  });
});

const getJobDetailsWithCandidatesAndInvitees = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const response = await JobService.getDetailsWithCandidateAndInvitees(id);
    return sendResponse(res, {
      data: response,
      message: "Job Details Fetched With Candidates And Invitees Successfully",
      statusCode: StatusCodes.OK,
      success: true,
    });
  }
);

export const JobController = {
  createJob,
  getAllJobs,
  getJobDetails,
  getJobDetailsWithCandidatesAndInvitees,
};
