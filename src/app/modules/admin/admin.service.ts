import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { JwtPayload } from "jsonwebtoken";
import { decodeToken, generateToken } from "../auth/auth.utils";
import config from "../../config";
import { TLoginAdmin } from "./admin.interface";
import Admin from "./admin.model";

// login admin
const loginAdmin = async (payload: TLoginAdmin) => {
  const { email, password } = payload;
  const admin = await Admin.findOne({ where: { email } });
  if (!admin) {
    throw new AppError(StatusCodes.FORBIDDEN, "Admin not registered.");
  }

  const isMatched = await decodeToken(password, admin.password);


  if (!isMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Incorrect password.");
  }

  const jwtPayload: JwtPayload = {
    adminId: admin.id,
    email: admin.email,
  };

  const accessToken = await generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string
  );

  const refreshToken = await generateToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_token_expires_in as string
  );

  return { accessToken, refreshToken };
};

const AdminService = {
  loginAdmin,
};

export default AdminService;
