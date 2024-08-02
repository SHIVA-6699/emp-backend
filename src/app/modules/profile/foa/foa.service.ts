import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";
import { Role } from "../../user/user.constant";
import FOA from "./foa.model";

const createFOAProfile = async (
  payload: Record<string, unknown>,
  userId: string
): Promise<FOA> => {
  // check if already FOA profile exist
  const isFOAProfileExistByUserId = await FOA.findOne({
    where: { userId },
  });
  if (isFOAProfileExistByUserId) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "FOA role already exists of the user."
    );
  }

  const currentUser = await User.findOne({ where: { id: userId } });

  const tx = await sequelizeConnection.transaction();
  let newFOAProfile;
  try {
    newFOAProfile = await FOA.create({ userId });

    await User.update(
      {
        current_role: Role.FOA,
        roles: [...currentUser!.roles, Role.FOA],
      },
      { where: { id: userId } }
    );

    await tx.commit();
  } catch (error) {
    await tx.rollback();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `There was a problem to create FOA profile.`
    );
  }

  return newFOAProfile;
};

const FOAServices = {
  createFOAProfile,
};

export default FOAServices;
