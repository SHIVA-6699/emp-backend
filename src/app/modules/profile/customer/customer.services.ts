import { StatusCodes } from "http-status-codes";
import AppError from "../../../errors/AppError";
import { Role } from "../../user/user.constant";
import User from "../../user/user.model";
import Customer from "./customer.model";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";

// create customer
const createCustomer = async (
  payload: Record<string, unknown>,
  userId: string
) => {
  const user = await User.findByPk(userId);
  // check if user already have customer role
  if (user?.roles.includes(Role.CUSTOMER)) {
    throw new AppError(
      StatusCodes.CONFLICT,
      `This user has already have ${Role.CUSTOMER} role. Please switch the role.`
    );
  }

  // transaction and role back
  let newCustomerProfile: Customer;
  const tx = await sequelizeConnection.transaction();
  try {
    newCustomerProfile = await Customer.create({ userId });
    await User?.update(
      { roles: [...user!.roles, Role.CUSTOMER], current_role: Role.CUSTOMER },
      { where: {} }
    );
    await tx.commit();
  } catch (error) {
    await tx.rollback();
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong. Please try again."
    );
  }

  return newCustomerProfile;
};

const CustomerServices = {
  createCustomer,
};

export default CustomerServices;
