import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import JobAssignmentToSRMServices from "./jobAssignmentToSRM.services";
import pick from "../../utils/pick";
import { JobAssignmentFilterableFields } from "./jobAssignmentToSRM.constants";
import { TJobAssignmentFilters } from "./jobAssignmentToSRM.interface";
import { Options } from "../../utils/calculatePagination";
// assign job to SRM]
const assignJobToSRM = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const payload = req.body;
  const result = await JobAssignmentToSRMServices.assignJobToSRM(
    payload,
    userId
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Job assigned successfully.",
    data: result,
  });
});

// get all job assignments for srm
const getAllJobAssignmentsForSRM = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const filters = pick(
    req.query,
    JobAssignmentFilterableFields
  ) as TJobAssignmentFilters;
  const options = pick(req.query, Options);
  const result = await JobAssignmentToSRMServices.getAllJobAssignmentsForSRM(
    options,
    filters,
    userId
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "All job assignments retrieved successfully.",
    data: result,
  });
});
// get all job assignments for srm
const getAllJobAssignmentsForCrm = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const filters = pick(
    req.query,
    JobAssignmentFilterableFields
  ) as TJobAssignmentFilters;
  const options = pick(req.query, Options);
  const result = await JobAssignmentToSRMServices.getAllJobAssignmentsForCrm(
    options,
    filters,
    userId
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "All job assignments retrieved  successfully.",
    data: result,
  });
});

// get single job assignment
const getSingleJobAssignmentById = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const jobAssignmentId = req.params.jobAssignmentId;
  const result = await JobAssignmentToSRMServices.getSingleJobAssignmentById(
    jobAssignmentId,
    userId
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Job assignment retrieved successfully.",
    data: result,
  });
});

// change status of job assignment
const changeJobAssignmentStatus = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const jobAssignmentId = req.params.jobAssignmentId;
  const status = req.body?.status;
  const result = await JobAssignmentToSRMServices.changeJobAssignmentStatus(
    jobAssignmentId,
    status,
    userId
  );

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Job assignment status changed successfully.",
    data: result,
  });
});
const JobAssignmentToSRMControllers = {
  assignJobToSRM,
  getAllJobAssignmentsForSRM,
  getAllJobAssignmentsForCrm,
  changeJobAssignmentStatus,
  getSingleJobAssignmentById,
};
export default JobAssignmentToSRMControllers;
