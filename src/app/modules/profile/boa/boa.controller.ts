import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import BOAServices from "./boa.service";

// create BOA
const createBOAProfile = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user.id;
  const result = await BOAServices.createBOAProfile(payload, userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "BOA profile created successfully",
    data: result,
  });
});

const BOAControllers = {
  createBOAProfile,
};

export default BOAControllers;
