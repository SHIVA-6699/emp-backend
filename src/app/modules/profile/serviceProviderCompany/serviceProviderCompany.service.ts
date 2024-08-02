import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";
import { Role } from "../../user/user.constant";
import ServiceProviderCompany from "./serviceProviderCompany.model";

const createServiceProviderCompanyProfile = async (
  payload: Record<string, unknown>,
  userId: string
): Promise<ServiceProviderCompany> => {
  // check if already ServiceProviderCompany profile exist
  const isServiceProviderCompanyProfileExistByUserId =
    await ServiceProviderCompany.findOne({
      where: { userId },
    });
  if (isServiceProviderCompanyProfileExistByUserId) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "ServiceProviderCompany role already exists of the user."
    );
  }

  const currentUser = await User.findOne({ where: { id: userId } });

  const tx = await sequelizeConnection.transaction();
  let newServiceProviderCompanyProfile;
  try {
    newServiceProviderCompanyProfile = await ServiceProviderCompany.create({
      userId,
    });

    await User.update(
      {
        current_role: Role.SERVICE_PROVIDER_COMPANY,
        roles: [...currentUser!.roles, Role.SERVICE_PROVIDER_COMPANY],
      },
      { where: { id: userId } }
    );

    await tx.commit();
  } catch (error) {
    await tx.rollback();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      `There was a problem to create ServiceProviderCompany profile.`
    );
  }

  return newServiceProviderCompanyProfile;
};

const ServiceProviderCompanyervices = {
  createServiceProviderCompanyProfile,
};

export default ServiceProviderCompanyervices;
