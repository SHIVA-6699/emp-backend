import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import CandidateServices from "./candidate.service";

// create candidate profile
const createCandidateProfile = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const payload = req.body;
  const result = await CandidateServices.createCandidateProfile(
    payload,
    userId
  );

  sendResponse(res, {
    data: result,
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Candidate profile created successfully",
  });
});

// update candidate profile
const updateCandidateProfile = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const payload = req.body;
  const result = await CandidateServices.updateCandidateProfile(
    payload,
    userId
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    data: result,
    message: "Candidate profile updated successfully",
  });
});

// add candidate experience
const addCandidateNewExperience = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const payload = req.body;
  const result = await CandidateServices.addCandidateNewExperience(
    payload,
    userId
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    data: result,
    message: "Candidate experience added successfully",
  });
});

// update candidate experience
const updateCandidateExperience = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const payload = req.body;
  const experienceId = req.params.experienceId;
  const result = await CandidateServices.updateCandidateExperience(
    payload,
    userId,
    experienceId
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    data: result,
    message: "Candidate experience updated successfully",
  });
});

// get all candidate profiles
const getAllCandidatesForSrm = catchAsync(async (req, res) => {
  const userId = req.user?.id;
  const jobAssignmentId = req.params.jobAssignmentId;
  const result = await CandidateServices.getAllCandidatesForSrm(
    jobAssignmentId,
    userId
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    data: result,
    message: "Candidate profiles fetched successfully",
  });
});
const CandidateControllers = {
  createCandidateProfile,
  updateCandidateProfile,
  addCandidateNewExperience,
  updateCandidateExperience,
  getAllCandidatesForSrm,
};

export default CandidateControllers;
