import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import SRMServices from "./srm.service";

// create SRM
const createSRMProfile = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user.id;
  const result = await SRMServices.createSRMProfile(payload, userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "SRM profile created successfully",
    data: result,
  });
});

// get all srm profiles
const getAllSRMProfile = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const jobId = req.params.jobId;
  const result = await SRMServices.getAllSRMProfile(jobId, userId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "All SRM profiles retrieved successfully",
    data: result,
  });
});

const SRMControllers = {
  createSRMProfile,
  getAllSRMProfile,
};

export default SRMControllers;
