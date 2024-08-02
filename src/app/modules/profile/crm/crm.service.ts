import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";
import { Role } from "../../user/user.constant";
import CRM from "./crm.model";

const createCRMProfile = async (
  payload: Record<string, unknown>,
  userId: string
): Promise<CRM> => {
  // check if already crm profile exist
  const isCRMProfileExistByUserId = await CRM.findOne({
    where: { userId },
  });
  if (isCRMProfileExistByUserId) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "CRM role already exists of the user."
    );
  }

  const currentUser = await User.findOne({ where: { id: userId } });

  const tx = await sequelizeConnection.transaction();
  let newCRMProfile;
  try {
    newCRMProfile = await CRM.create({ userId });

    await User.update(
      {
        current_role: Role.CRM,
        roles: [...currentUser!.roles, Role.CRM],
      },
      { where: { id: userId } }
    );

    await tx.commit();
  } catch (error) {
    await tx.rollback();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `There was a problem to create crm profile.`
    );
  }

  return newCRMProfile;
};

const CRMServices = {
  createCRMProfile,
};

export default CRMServices;
