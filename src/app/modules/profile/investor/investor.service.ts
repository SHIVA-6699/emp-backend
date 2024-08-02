import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";
import { Role } from "../../user/user.constant";
import Investor from "./investor.model";

const createInvestorProfile = async (
  payload: Record<string, unknown>,
  userId: string
): Promise<Investor> => {
  // check if already Investor profile exist
  const isInvestorProfileExistByUserId = await Investor.findOne({
    where: { userId },
  });
  if (isInvestorProfileExistByUserId) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Investor role already exists of the user."
    );
  }

  const currentUser = await User.findOne({ where: { id: userId } });

  const tx = await sequelizeConnection.transaction();
  let newInvestorProfile;
  try {
    newInvestorProfile = await Investor.create({ userId });

    await User.update(
      {
        current_role: Role.INVESTOR,
        roles: [...currentUser!.roles, Role.INVESTOR],
      },
      { where: { id: userId } }
    );

    await tx.commit();
  } catch (error) {
    await tx.rollback();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `There was a problem to create Investor profile.`
    );
  }

  return newInvestorProfile;
};

const InvestorServices = {
  createInvestorProfile,
};

export default InvestorServices;
