import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";
import { Role } from "../../user/user.constant";
import BOA from "./boa.model";

const createBOAProfile = async (
  payload: Record<string, unknown>,
  userId: string
): Promise<BOA> => {
  // check if already BOA profile exist
  const isBOAProfileExistByUserId = await BOA.findOne({
    where: { userId },
  });
  if (isBOAProfileExistByUserId) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "BOA role already exists of the user."
    );
  }

  const currentUser = await User.findOne({ where: { id: userId } });

  const tx = await sequelizeConnection.transaction();
  let newBOAProfile;
  try {
    newBOAProfile = await BOA.create({ userId });

    await User.update(
      {
        current_role: Role.BOA,
        roles: [...currentUser!.roles, Role.BOA],
      },
      { where: { id: userId } }
    );

    await tx.commit();
  } catch (error) {
    await tx.rollback();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `There was a problem to create BOA profile.`
    );
  }

  return newBOAProfile;
};

const BOAServices = {
  createBOAProfile,
};

export default BOAServices;
