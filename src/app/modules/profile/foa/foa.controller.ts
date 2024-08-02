import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import FOAServices from "./foa.service";

// create FOA
const createFOAProfile = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user.id;
  const result = await FOAServices.createFOAProfile(payload, userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "FOA profile created successfully",
    data: result,
  });
});

const FOAControllers = {
  createFOAProfile,
};

export default FOAControllers;
