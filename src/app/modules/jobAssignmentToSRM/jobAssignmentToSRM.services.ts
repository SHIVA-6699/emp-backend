import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { Role } from "../user/user.constant";
import User from "../user/user.model";
import {
  TJobAssignmentFilters,
  TJobAssignmentInputProps,
  TJobAssignmentToSRM,
  TStatus,
} from "./jobAssignmentToSRM.interface";
import Job from "../job/job.model";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import SRM from "../profile/srm/srm.model";
import { Op, WhereOptions } from "sequelize";
import CRM from "../profile/crm/crm.model";
import JobAssignmentToSRM from "./jobAssignmentToSRM.model";
import { TUserAttributes } from "../user/user.interface";
import BasicProfile from "../profile/basicProfile/basicProfile.model";
import calculatePagination, { TOptions } from "../../utils/calculatePagination";

// assign job to SRM
const assignJobToSRM = async (
  payload: TJobAssignmentInputProps,
  userId: string
) => {
  /* 
1. check users current role is crm
2. check is job exist
4. check are srm exist
*/

  const user = await User.findByPk(userId, {
    include: [
      {
        model: CRM,
        as: "crmProfile",
      },
    ],
  });
  // check users current role is crm
  if (user?.current_role !== Role.CRM) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Only srm can assign job!");
  }

  //   check is job exist
  const job = await Job.findByPk(payload.jobId);
  if (!job) {
    throw new AppError(StatusCodes.NOT_FOUND, "Job not found!");
  }

  const transaction = await sequelizeConnection.transaction();
  try {
    //   check are SRMs exist
    const areSRMsExist = await SRM.findAll({
      where: {
        id: {
          [Op.in]: payload.srmIds,
        },
      },
      transaction,
    });

    if (areSRMsExist?.length !== payload?.srmIds?.length) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "One or more SRMs do not exist."
      );
    }

    const jobAssignments: TJobAssignmentToSRM[] = payload?.srmIds?.map(
      srmId => ({
        crmId: (user as TUserAttributes)?.crmProfile?.id as string,
        jobId: job?.id,
        srmId,
        status: "PENDING",
      })
    );

    await JobAssignmentToSRM.bulkCreate(jobAssignments, { transaction });
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "There was  a problem creating job assignment to srm."
    );
  }
};

// get all job assignment for srm
const getAllJobAssignmentsForSRM = async (
  options: TOptions,
  filters: TJobAssignmentFilters,
  userId: string
): Promise<JobAssignmentToSRM[]> => {
  /* 
check user current role is srm

*/

  const user = await User.findByPk(userId, {
    include: [
      {
        model: SRM,
        as: "SRMProfile",
      },
    ],
  });

  // check user current role is srm

  if (user?.current_role !== Role.SRM) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "Only srm can get job assignment!"
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
      [key as keyof TJobAssignmentFilters]:
        filters[key as keyof TJobAssignmentFilters],
    }));
  }

  const jobAssignments = await JobAssignmentToSRM.findAll({
    where,
    include: [
      {
        model: Job,
        as: "job",
      },
      {
        model: CRM,
        as: "crm",
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

  return jobAssignments;
};

// get all job assignment for crm for a job id
const getAllJobAssignmentsForCrm = async (
  options: TOptions,
  filters: TJobAssignmentFilters,
  userId: string
) => {
  /* 
  check user current role is crm
  filtering and sorting
  */

  const user = await User.findByPk(userId, {
    include: [
      {
        model: CRM,
        as: "crmProfile",
      },
    ],
  });

  if (user?.current_role !== Role.CRM) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "Only crm can get job his assignments!"
    );
  }

  //  filtering and sorting
  const { limit, skip, sortBy, sortOrder } = calculatePagination(options);

  const where: WhereOptions = {
    crmId: (user as TUserAttributes)?.crmProfile?.id,
  };

  const filterKeys = Object.keys(filters);
  if (filterKeys.length > 0) {
    where[Op.and as unknown as string] = filterKeys.map(key => ({
      [key as keyof TJobAssignmentFilters]:
        filters[key as keyof TJobAssignmentFilters],
    }));
  }
  const jobAssignments = await JobAssignmentToSRM.findAll({
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

  return jobAssignments;
};

// get single job assignment by id
const getSingleJobAssignmentById = async (
  jobAssignmentId: string,
  userId: string
) => {
  const mySrmProfile = await SRM.findOne({ where: { userId } });
  if (!mySrmProfile) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "Only srm can get job assignment!"
    );
  }

  const jobAssignment = await JobAssignmentToSRM.findByPk(jobAssignmentId, {
    include: [
      {
        model: Job,
        as: "job",
      },
      {
        model: CRM,
        as: "crm",
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
  });
  if (jobAssignment?.srmId !== mySrmProfile?.id) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Your are not invited to this job.!"
    );
  }
  return jobAssignment;
};

// change status of job assignment
const changeJobAssignmentStatus = async (
  jobAssignmentId: string,
  status: TStatus,
  userId: string
) => {
  /* 
  1. check job assignment id is valid 
  2. check user current role is srm
  3. check user belongs to this job assignment
  4. updating status is not pending 
  5. current status should be pending
  */

  const jobAssignment = await JobAssignmentToSRM.findByPk(jobAssignmentId);
  if (!jobAssignment) {
    throw new AppError(StatusCodes.NOT_FOUND, "Job assignment not found!");
  }
  /*   if (jobAssignment?.status !== "PENDING") {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Cannot change status of non pending job assignment!"
    );
  } */

  const srm = await SRM.findOne({
    where: {
      userId,
    },
  });

  if (!srm) {
    throw new AppError(StatusCodes.NOT_FOUND, "User SRM role not found!");
  }

  if (srm?.id !== jobAssignment?.srmId) {
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

  const result = await JobAssignmentToSRM.update(
    { status },
    { where: { id: jobAssignmentId } }
  );
  return result;
};
const JobAssignmentToSRMServices = {
  assignJobToSRM,
  getAllJobAssignmentsForSRM,
  changeJobAssignmentStatus,
  getSingleJobAssignmentById,
  getAllJobAssignmentsForCrm,
};
export default JobAssignmentToSRMServices;
