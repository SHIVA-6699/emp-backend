import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { Role } from "../user/user.constant";
import User from "../user/user.model";
import { TLoginUser, TRegisterUser } from "./auth.interface";
import {
  decodeToken,
  generateToken,
  hashPassword,
  verifyToken,
} from "./auth.utils";

// register user
const register = async (payload: TRegisterUser) => {
  const { email } = payload;
  // check is user already exist by the email
  const isUserExist = await User.findOne({ where: { email: email } });

  if (isUserExist) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Already have an account with this email."
    );
  }

  // // JWT payload
  // const jwtPayload: JwtPayload = {
  //   email,
  //   password,
  // };

  // // create verification token
  // const verificationToken = await generateToken(
  //   jwtPayload,
  //   config.jwt_access_secret as string,
  //   "5m"
  // );

  // // Verification account link
  // const verificationLink = `${config.client_url}/verify-account?token=${verificationToken}`;

  // // send verification email
  // sendEmail({
  //   html: verificationLink,
  //   receiver: email,
  //   subject: "Verify your account.",
  // });

  // return null;

  // ______________ ________________________________________________________________________

  const user = await User.create({
    current_role: Role.USER,
    email: payload.email,
    password: await hashPassword(payload.password),
    roles: [Role.USER],
  });

  const jwtPayload: JwtPayload = {
    userId: user.id,
    current_role: user.current_role,
    email: user.email,
  };

  // generate access token
  const accessToken = await generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string
  );

  // generate refresh token
  const refreshToken = await generateToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_token_expires_in as string
  );
  return { accessToken, refreshToken };
};

// verify account
const verifyAccount = async (token: string) => {
  const payload = {
    password: "",
    email: "",
    roles: ["USER"],
    current_role: "USER",
  };
  const decoded = (await verifyToken(
    token,
    config.jwt_access_secret as string
  )) as JwtPayload;

  if (!decoded) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Token is not valid.");
  }

  // hash password
  payload.password = await hashPassword(decoded.password);
  payload.email = decoded.email;

  const result = await User.create(payload);
  if (!result) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Failed to create user.");
  }
  // jwt payload
  const jwtPayload: JwtPayload = {
    userId: result.dataValues.id,
    role: result.dataValues.current_role,
    email: result.dataValues.email,
  };
  // generate access token
  const accessToken = await generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string
  );

  // generate refresh token
  const refreshToken = await generateToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_token_expires_in as string
  );

  return { accessToken, refreshToken };
};

// login user
const login = async (payload: TLoginUser) => {
  const { email, password } = payload;

  // check if user is exit
  const isUserExist = await User.findOne({ where: { email } });

  if (!isUserExist) {
    throw new AppError(StatusCodes.FORBIDDEN, "User not registered.");
  }

  // decoded password and check
  const isMatched = await decodeToken(password, isUserExist.password);

  if (!isMatched) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "Your provided password is incorrect."
    );
  }

  const jwtPayload: JwtPayload = {
    userId: isUserExist.id,
    current_role: isUserExist.current_role,
    email: isUserExist.email,
  };

  // generate access token
  const accessToken = await generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string
  );

  // generate refresh token
  const refreshToken = await generateToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_token_expires_in as string
  );
  return { accessToken, refreshToken };
};

//refresh token
const refreshToken = async (token: string) => {
  // check is token sent
  if (!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Token not founded.");
  }

  const decoded = (await verifyToken(
    token,
    config.jwt_refresh_secret as string
  )) as JwtPayload;

  if (!decoded) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid token");
  }

  // check if user exist
  const isUserExist = await User.findOne({ where: { id: decoded.userId } });
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "Account not founded.");
  }

  // jwt payload
  const jwtPayload: JwtPayload = {
    userId: isUserExist.dataValues.id,
    current_role: isUserExist.dataValues.current_role,
    email: isUserExist.dataValues.email,
  };
  // generate access token
  const accessToken = await generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_token_expires_in as string
  );

  return { accessToken };
};
const AuthService = {
  register,
  login,
  verifyAccount,
  refreshToken,
};
export default AuthService;
