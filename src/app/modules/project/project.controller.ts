import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ProjectService } from "./project.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";

const createProject = catchAsync(async (req: Request, res: Response) => {
  try {
    const projectData = req.body;
    const userId = req.user.id;
    const response = await ProjectService.create({ ...projectData, userId });
    return sendResponse(res, {
      data: response,
      statusCode: StatusCodes.CREATED,
      message: "Project Uploaded Successfully",
      success: true,
    });
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while uploading project"
    );
  }
});

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  try {
    const response = await ProjectService.getAll();
    return sendResponse(res, {
      data: response,
      statusCode: StatusCodes.OK,
      message: "Project Fetched Successfully",
      success: true,
    });
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while getting projects"
    );
  }
});

export const ProjectController = {
  createProject,
  getAllProjects,
};
