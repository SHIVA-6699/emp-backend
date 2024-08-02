import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";
import { Role } from "../../user/user.constant";
import TOA from "./toa.model";

const createTOAProfile = async (
  payload: Record<string, unknown>,
  userId: string
): Promise<TOA> => {
  // check if already TOA profile exist
  const isTOAProfileExistByUserId = await TOA.findOne({
    where: { userId },
  });
  if (isTOAProfileExistByUserId) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "TOA role already exists of the user."
    );
  }

  const currentUser = await User.findOne({ where: { id: userId } });

  const tx = await sequelizeConnection.transaction();
  let newTOAProfile;
  try {
    newTOAProfile = await TOA.create({ userId });

    await User.update(
      {
        current_role: Role.TOA,
        roles: [...currentUser!.roles, Role.TOA],
      },
      { where: { id: userId } }
    );

    await tx.commit();
  } catch (error) {
    await tx.rollback();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `There was a problem to create TOA profile.`
    );
  }

  return newTOAProfile;
};

const TOAServices = {
  createTOAProfile,
};

export default TOAServices;
