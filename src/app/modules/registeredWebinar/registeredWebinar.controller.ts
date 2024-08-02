import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { RegisteredWebinarService } from "./registeredWebinar.service";
import sendResponse from "../../utils/sendResponse";

const registerForWebinar = catchAsync(async (req: Request, res: Response) => {
  const { firstName, lastName, email, companyName, webinarId } = req.body;
  const userId = req.user.id || "4f432a13-3950-45b7-8feb-514010c5b97a";
  if (
    [firstName, lastName, email, companyName, webinarId].some(
      x => x.trim() === ""
    )
  ) {
    throw new AppError(StatusCodes.NOT_FOUND, "All Fields Are Required");
  }
  const response = await RegisteredWebinarService.create({
    firstName,
    lastName,
    email,
    companyName,
    webinarId,
    userId,
  });
  sendResponse(res, {
    data: response,
    success: true,
    message: "Registered Successfully",
    statusCode: StatusCodes.CREATED,
  });
});

export const RegisteredWebinarController = {
  registerForWebinar,
};
