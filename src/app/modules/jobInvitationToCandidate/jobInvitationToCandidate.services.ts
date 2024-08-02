import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import SRM from "../profile/srm/srm.model";
import { Role } from "../user/user.constant";
import User from "../user/user.model";
import {
  TInviteJobPayload,
  TJobInvitationFilters,
  TJobInvitationToCandidate,
} from "./jobInvitationToCandidate.interfaces";
import JobAssignmentToSRM from "../jobAssignmentToSRM/jobAssignmentToSRM.model";
import Job from "../job/job.model";
import CRM from "../profile/crm/crm.model";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import Candidate from "../profile/candidate/candidate.model";
import { Op, WhereOptions } from "sequelize";
import JobInvitationToCandidate from "./jobInvitationToCandidate.interfaces.model";
import { TUserAttributes } from "../user/user.interface";
import BasicProfile from "../profile/basicProfile/basicProfile.model";
import calculatePagination, { TOptions } from "../../utils/calculatePagination";
import { TStatus } from "../jobAssignmentToSRM/jobAssignmentToSRM.interface";

// invite job to candidate
const inviteJobToCandidate = async (
  payload: TInviteJobPayload,
  userId: string
) => {
  /* 
    1. check user current role is SRM
    2. check jobAssignmentId is valid
    3. get crm , job  id from jobAssignment
    4. check crm id is valid
    5. check job id is valid
    6. check candidate ids are valid
    */

  const user = await User.findByPk(userId, {
    include: [
      {
        model: SRM,
        as: "SRMProfile",
      },
    ],
  });

  // check user current role is SRM
  if (user?.current_role !== Role.SRM) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "SRM is only allowed to invite to job."
    );
  }

  // check job assignment id is valid
  const jobAssignmentToSRM = await JobAssignmentToSRM.findByPk(
    payload?.jobAssignmentToSRMId
  );

  if (!jobAssignmentToSRM) {
    throw new AppError(StatusCodes.NOT_FOUND, "Invalid job assignment id.");
  }

  // check job id is valid
  const job = await Job.findByPk(jobAssignmentToSRM?.jobId);

  if (!job) {
    throw new AppError(StatusCodes.NOT_FOUND, "Invalid job id.");
  }

  // check crm id is valid
  const crm = await CRM.findByPk(jobAssignmentToSRM?.crmId);
  if (!crm) {
    throw new AppError(StatusCodes.NOT_FOUND, "Invalid crm id.");
  }

  const transaction = await sequelizeConnection.transaction();
  try {
    const areCandidatesExist = await Candidate.findAll({
      where: {
        id: {
          [Op.in]: payload?.candidateIds,
        },
      },
      transaction,
    });
    // check candidate ids are valid
    if (areCandidatesExist?.length !== payload?.candidateIds?.length) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "One or more candidate id is invalid."
      );
    }

    const jobInvitations: TJobInvitationToCandidate[] =
      payload?.candidateIds?.map(candidateId => ({
        candidateId,
        jobId: jobAssignmentToSRM?.jobId,
        srmId: jobAssignmentToSRM?.srmId,
        jobAssignmentToSRMId: jobAssignmentToSRM?.id,
        status: "PENDING",
      }));

    await JobInvitationToCandidate.bulkCreate(jobInvitations, { transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "There was an problem inviting job."
    );
  }
};

// get all job invitations for candidate
const getAllInvitationsForCandidate = async (
  filters: TJobInvitationFilters,
  options: TOptions,
  userId: string
): Promise<JobInvitationToCandidate[]> => {
  /* 
check user current role is candidate

*/

  const user = await User.findByPk(userId, {
    include: [
      {
        model: Candidate,
        as: "candidateProfile",
      },
    ],
  });

  // check user current role is candidate
  if (user && user?.current_role !== Role.CANDIDATE) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "Only candidate can get job invitations!"
    );
  }

  // filtering and sorting
  const where: WhereOptions = {
    candidateId: (user as TUserAttributes)?.candidateProfile?.id,
  };
  // filters by fields
  const { limit, skip, sortBy, sortOrder } = calculatePagination(options);
  const filterKeys = Object.keys(filters);
  if (filterKeys?.length > 0) {
    where[Op.and as unknown as string] = filterKeys?.map(key => ({
      [key]: filters[key as keyof TJobInvitationFilters],
    }));
  }
  const jobInvitations = await JobInvitationToCandidate.findAll({
    where,
    include: [
      {
        model: Job,
        as: "job",
      },
      {
        model: SRM,
        as: "srm",
        include: [
          {
            model: User,
            as: "user",
            attributes: { exclude: ["password"] },
            include: [
              {
                model: BasicProfile,
                as: "basicProfile",
              },
            ],
          },
        ],
      },
    ],
    offset: skip,
    limit,
    order: [[sortBy, sortOrder]],
  });

  return jobInvitations;
};

// get all job invitation for srm for a job id
const getAllJobInvitationForSrm = async (
  options: TOptions,
  filters: TJobInvitationFilters,
  userId: string
) => {
  /* 
  check user current role is srm
  filtering and sorting
  */

  const user = await User.findByPk(userId, {
    include: [
      {
        model: SRM,
        as: "SRMProfile",
      },
    ],
  });

  if (user?.current_role !== Role.SRM) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "Only srm can get job his assignments!"
    );
  }

  //  filtering and sorting
  const { limit, skip, sortBy, sortOrder } = calculatePagination(options);

  const where: WhereOptions = {
    srmId: (user as TUserAttributes)?.SRMProfile?.id,
  };

  const filterKeys = Object.keys(filters);
  if (filterKeys.length > 0) {
    where[Op.and as unknown as string] = filterKeys.map(key => ({
      [key as keyof TJobInvitationFilters]:
        filters[key as keyof TJobInvitationFilters],
    }));
  }
  const jobInvitations = await JobInvitationToCandidate.findAll({
    where,
    include: [
      {
        model: Job,
        as: "job",
      },
      {
        model: Candidate,
        as: "candidate",
        include: [
          {
            model: User,
            as: "user",
            attributes: { exclude: ["password"] },
            include: [
              {
                model: BasicProfile,
                as: "basicProfile",
              },
            ],
          },
        ],
      },
    ],
    offset: skip,
    limit,
    order: [[sortBy, sortOrder]],
  });

  return jobInvitations;
};

// get single job Invitation by id
const getSingleJobInvitationId = async (
  jobInvitationId: string,
  userId: string
) => {
  const myCandidateProfile = await Candidate.findOne({ where: { userId } });
  if (!myCandidateProfile) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "Only candidate can get job assignment!"
    );
  }

  const jobInvitation = await JobInvitationToCandidate.findByPk(
    jobInvitationId,
    {
      include: [
        {
          model: Job,
          as: "job",
        },
        {
          model: SRM,
          as: "srm",
          include: [
            {
              model: User,
              as: "user",
              attributes: { exclude: ["password"] },
              include: [
                {
                  model: BasicProfile,
                  as: "basicProfile",
                },
              ],
            },
          ],
        },
      ],
    }
  );
  if (jobInvitation?.candidateId !== myCandidateProfile?.id) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Your are not invited to this job.!"
    );
  }
  return jobInvitation;
};

// change status of job assignment
const changeJobInvitationStatus = async (
  jobInvitationId: string,
  status: TStatus,
  userId: string
) => {
  /* 
  1. check job invitation id is valid 
  2. check user current role is candidate
  3. check user belongs to this job invitation
  4. updating status is not pending 
  5. current status should be pending
  */

  const jobInvitation =
    await JobInvitationToCandidate.findByPk(jobInvitationId);
  if (!jobInvitation) {
    throw new AppError(StatusCodes.NOT_FOUND, "Job invitation not found!");
  }
  /*   if (jobInvitation?.status !== "PENDING") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Cannot change status of non pending job invitation!"
    );
  } */

  const candidate = await Candidate.findOne({
    where: {
      userId,
    },
  });

  if (!candidate) {
    throw new AppError(StatusCodes.NOT_FOUND, "User candidate role not found!");
  }

  if (candidate?.id !== jobInvitation?.candidateId) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "Your are not invited for this job!"
    );
  }

  if (status === "PENDING") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Cannot set status as PENDING!"
    );
  }

  const result = await JobInvitationToCandidate.update(
    { status },
    { where: { id: jobInvitationId } }
  );
  return result;
};

const JobInvitationToCandidateServices = {
  inviteJobToCandidate,
  getAllInvitationsForCandidate,
  changeJobInvitationStatus,
  getAllJobInvitationForSrm,
  getSingleJobInvitationId,
};

export default JobInvitationToCandidateServices;
