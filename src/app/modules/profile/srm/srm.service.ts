import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";
import { Role } from "../../user/user.constant";
import SRM from "./srm.model";
import BasicProfile from "../basicProfile/basicProfile.model";
import JobAssignmentToSRM from "../../jobAssignmentToSRM/jobAssignmentToSRM.model";
import { Op } from "sequelize";

// create srm profile
const createSRMProfile = async (
  payload: Record<string, unknown>,
  userId: string
): Promise<SRM> => {
  // check if already SRM profile exist
  const isSRMProfileExistByUserId = await SRM.findOne({
    where: { userId },
  });
  if (isSRMProfileExistByUserId) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "SRM role already exists of the user."
    );
  }

  const currentUser = await User.findOne({ where: { id: userId } });

  const tx = await sequelizeConnection.transaction();
  let newSRMProfile;
  try {
    newSRMProfile = await SRM.create({ userId });

    await User.update(
      {
        current_role: Role.SRM,
        roles: [...currentUser!.roles, Role.SRM],
      },
      { where: { id: userId } }
    );

    await tx.commit();
  } catch (error) {
    await tx.rollback();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `There was a problem to create SRM profile.`
    );
  }

  return newSRMProfile;
};

// get all srm profile
const getAllSRMProfile = async (
  jobId: string,
  userId: string
): Promise<SRM[]> => {
  const mySrmProfile = await SRM.findOne({ where: { userId } });

  const jobAssignments = await JobAssignmentToSRM.findAll({
    where: {
      jobId,
    },
  });

  let notIncludedSrmIds: string[] = [];
  if (jobAssignments.length) {
    notIncludedSrmIds = jobAssignments.map(
      jobAssignment => jobAssignment.srmId
    );
  }

  if (mySrmProfile) {
    notIncludedSrmIds.push(mySrmProfile.id);
  }

  const srmProfiles = await SRM.findAll({
    where: {
      id: {
        [Op.notIn]: notIncludedSrmIds,
      },
    },
    include: [
      {
        model: User,
        as: "user",
        attributes: {
          exclude: ["password", "roles"],
        },
        include: [
          {
            model: BasicProfile,
            as: "basicProfile",
          },
        ],
      },
    ],
  });
  return srmProfiles;
};

const SRMServices = {
  createSRMProfile,
  getAllSRMProfile,
};

export default SRMServices;
