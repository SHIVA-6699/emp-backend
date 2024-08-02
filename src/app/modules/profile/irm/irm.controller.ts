import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import IRMServices from "./irm.service";

// create IRM
const createIRMProfile = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user.id;
  const result = await IRMServices.createIRMProfile(payload, userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "IRM profile created successfully",
    data: result,
  });
});

const IRMControllers = {
  createIRMProfile,
};

export default IRMControllers;
