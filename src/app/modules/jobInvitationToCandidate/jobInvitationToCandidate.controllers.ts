import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import JobInvitationToCandidateServices from "./jobInvitationToCandidate.services";
import pick from "../../utils/pick";
import { Options } from "../../utils/calculatePagination";
import { JobInvitationFilterableField } from "./jobInvitationToCandidate.constants";
import { TJobInvitationFilters } from "./jobInvitationToCandidate.interfaces";

// invite job to candidate
const inviteJobToCandidate = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const payload = req.body;
  const result = await JobInvitationToCandidateServices.inviteJobToCandidate(
    payload,
    userId
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Job invitation sent successfully",
    data: result,
  });
});

// get all job invitation for candidate
const getAllInvitationsForCandidate = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const options = pick(req.query, Options);
  const filters = pick(
    req.query,
    JobInvitationFilterableField
  ) as TJobInvitationFilters;
  const result =
    await JobInvitationToCandidateServices.getAllInvitationsForCandidate(
      filters,
      options,
      userId
    );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "All job invitations retrieved successfully.",
    data: result,
  });
});
// get all job invitation for srm
const getAllJobInvitationForSrm = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const options = pick(req.query, Options);
  const filters = pick(
    req.query,
    JobInvitationFilterableField
  ) as TJobInvitationFilters;
  const result =
    await JobInvitationToCandidateServices.getAllJobInvitationForSrm(
      options,
      filters,
      userId
    );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "All job invitations retrieved successfully.",
    data: result,
  });
});

// get single job invitation
const getSingleJobInvitationById = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const jobInvitationId = req.params.jobInvitationId;
  const result =
    await JobInvitationToCandidateServices.getSingleJobInvitationId(
      jobInvitationId,
      userId
    );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Job Invitation retrieved successfully.",
    data: result,
  });
});

// change status of job invitation
const changeJobInvitationStatus = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const jobInvitationId = req.params.jobInvitationId;
  const status = req.body?.status;
  const result =
    await JobInvitationToCandidateServices.changeJobInvitationStatus(
      jobInvitationId,
      status,
      userId
    );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Job invitation status changed successfully.",
    data: result,
  });
});
const JobInvitationToCandidateControllers = {
  inviteJobToCandidate,
  getAllInvitationsForCandidate,
  changeJobInvitationStatus,
  getAllJobInvitationForSrm,
  getSingleJobInvitationById,
};
export default JobInvitationToCandidateControllers;
