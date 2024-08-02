import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import CRMServices from "./crm.service";

// create CRM
const createCRMProfile = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user.id;
  const result = await CRMServices.createCRMProfile(payload, userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "CRM profile created successfully",
    data: result,
  });
});

const CRMControllers = {
  createCRMProfile,
};

export default CRMControllers;
