import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";
import { Role } from "../../user/user.constant";
import IRM from "./irm.model";

const createIRMProfile = async (
  payload: Record<string, unknown>,
  userId: string
): Promise<IRM> => {
  // check if already IRM profile exist
  const isIRMProfileExistByUserId = await IRM.findOne({
    where: { userId },
  });
  if (isIRMProfileExistByUserId) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "IRM role already exists of the user."
    );
  }

  const currentUser = await User.findOne({ where: { id: userId } });

  const tx = await sequelizeConnection.transaction();
  let newIRMProfile;
  try {
    newIRMProfile = await IRM.create({ userId });

    await User.update(
      {
        current_role: Role.IRM,
        roles: [...currentUser!.roles, Role.IRM],
      },
      { where: { id: userId } }
    );

    await tx.commit();
  } catch (error) {
    await tx.rollback();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `There was a problem to create IRM profile.`
    );
  }

  return newIRMProfile;
};

const IRMServices = {
  createIRMProfile,
};

export default IRMServices;
