import { WhereOptions, Op, fn, col } from "sequelize";
import calculatePagination, { TOptions } from "../../utils/calculatePagination";
import Job from "../job/job.model";
import { TValueChainFilters } from "./valueChain.interfaces";
import JobAssignmentToSRM from "../jobAssignmentToSRM/jobAssignmentToSRM.model";
import JobInvitationToCandidate from "../jobInvitationToCandidate/jobInvitationToCandidate.interfaces.model";

// get all value chain
const getAllValueChain = async (
  options: TOptions,
  filters: TValueChainFilters
) => {
  // pagination and sorting
  const { limit, skip, sortBy, sortOrder } = calculatePagination(options);

  // building filters
  const where: WhereOptions = {};

  const filterKeys = Object.keys(filters);
  if (filterKeys.length > 0) {
    where[Op.and as unknown as string] = filterKeys.map(key => ({
      [key]: filters[key as keyof TValueChainFilters],
    }));
  }

  // fetching data
  const allValueChain = await Job.findAll({
    where,
    offset: skip,
    limit,
    include: [
      {
        model: JobAssignmentToSRM,
        as: "jobAssignmentsToSRM",
        attributes: [], // No need to select any columns from jobAssignmentsToSRM
        required: false, // This makes it a LEFT JOIN
      },
      {
        model: JobInvitationToCandidate,
        as: "jobInvitations",
        attributes: [], // No need to select any columns from jobInvitations
        required: false, // This makes it a LEFT JOIN
      },
    ],
    attributes: [
      "id",
      "jobId",
      "status",
      "jobRole",
      [fn("COUNT", col("jobAssignmentsToSRM.id")), "crmCount"],
      [fn("COUNT", col("jobInvitations.id")), "srmCount"],
      "createdAt",
    ],
    group: ["Job.id"],
    subQuery: false, // Important to prevent Sequelize from creating a subquery
    order: [[sortBy, sortOrder]],
  });
  return allValueChain;
};

const ValueChainServices = {
  getAllValueChain,
};

export default ValueChainServices;
