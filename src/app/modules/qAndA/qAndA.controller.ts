import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import QAndAService from "./qAndA.service";

const createQAndA = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await QAndAService.createQAndA(payload);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Q and Audio created successfully.",
    data: result,
  });
});

const getAllQAndA = catchAsync(async (req, res) => {
  const result = await QAndAService.getAllQAndA();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "All Q And Audio retrieved successfully.",
    data: result,
  });
});

const QAndAController = {
  createQAndA,
  getAllQAndA,
};

export default QAndAController;
