import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import InterviewerServices from "./interviewer.service";

// create interviewer
const createInterviewerProfile = catchAsync(async (req, res) => {
  const payload = req.body;
  const userId = req.user.id;
  const result = await InterviewerServices.createInterviewerProfile(
    payload,
    userId
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Interviewer profile created successfully",
    data: result,
  });
});

const InterviewerControllers = {
  createInterviewerProfile,
};

export default InterviewerControllers;
