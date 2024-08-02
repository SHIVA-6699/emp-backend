import config from "../config";
import { Role } from "../modules/user/user.constant";
import { TUserAttributes } from "../modules/user/user.interface";
import User from "../modules/user/user.model";

const superAdminPayload: TUserAttributes = {
  email: config.super_admin_email as string,
  password: config.super_admin_password as string,
  roles: [Role.SUPER_ADMIN, Role.USER],
  current_role: Role.SUPER_ADMIN,
  email_verified: true
};

const seedSuperAdmin = async () => {
  const isSuperAdminExist = await User.findOne({
    where: {},
  });
  if (!isSuperAdminExist) {
    await User.create(superAdminPayload);
  }
};
export default seedSuperAdmin;
