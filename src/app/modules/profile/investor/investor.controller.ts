import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import InvestorServices from "./investor.service";

// create Investor
const createInvestorProfile = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user.id;
  const result = await InvestorServices.createInvestorProfile(payload, userId);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Investor profile created successfully",
    data: result,
  });
});

const InvestorControllers = {
  createInvestorProfile,
};

export default InvestorControllers;
