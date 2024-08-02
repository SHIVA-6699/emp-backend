import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import TOAServices from "./toa.service";

// create TOA
const createTOAProfile = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user.id;
  const result = await TOAServices.createTOAProfile(payload, userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "TOA profile created successfully",
    data: result,
  });
});

const TOAControllers = {
  createTOAProfile,
};

export default TOAControllers;
