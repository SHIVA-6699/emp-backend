import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import BasicProfileServices from "./basicProfile.services";
import sendResponse from "../../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";

// create basic profile
const createBasicProfile = catchAsync(async (req: Request, res: Response) => {
  const profileData = req.body;
  const userId = req.user?.id;
  const response = await BasicProfileServices.createBasicProfile(
    profileData,
    userId
  );
  sendResponse(res, {
    data: response,
    message: "Basic Profile Created Successfully",
    success: true,
    statusCode: StatusCodes.CREATED,
  });
});

// create basic profile
const getMe = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const role = req.user?.current_role;

  const response = await BasicProfileServices.getMe(userId, role);
  sendResponse(res, {
    data: response,
    message: "Basic Profile retrieved Successfully",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const switchMyRole = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const roleToSwitch = req.body.roleToSwitch;

  const result = await BasicProfileServices.switchMyRole(userId, roleToSwitch);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Role switched successfully",
    data: result,
  });
});

// update my profile image
const uploadProfileImage = catchAsync(async (req: Request, res: Response) => {
  const local_path = req.file?.path;
  if (!local_path) {
    throw new AppError(StatusCodes.NOT_FOUND, "Profile Image not found");
  }
  const userId = req.user?.id;
  const response = await BasicProfileServices.uploadProfileImage({
    local_path,
    userId,
  });
  sendResponse(res, {
    data: response,
    message: "Basic Profile Image Uploaded Successfully",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

// update my basic profile data
const updateBasicProfile = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user.id;

  const result = await BasicProfileServices.updateBasicProfile(payload, userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: `Basic Profile has been updated successfully.`,
    data: result,
  });
});

export const BasicProfileControllers = {
  createBasicProfile,
  getMe,
  switchMyRole,
  uploadProfileImage,
  updateBasicProfile,
};
