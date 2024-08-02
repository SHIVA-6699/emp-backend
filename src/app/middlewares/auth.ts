import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import config from "../config";
import User from "../modules/user/user.model";
import { verifyToken } from "../modules/auth/auth.utils";
import { TRoleType } from "../modules/user/user.constant";

const auth = (...requiredRoles: TRoleType[]) => {
  /* 
  1. check token was sent
  2. check token is validate
  3. check user is exist
  4. check user is not deleted
  5. check user is not blocked
  6. check role is authorized
  
  */
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // check token is available
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Access token is not sent.");
    }
    // check token is valid
    const decoded = (await verifyToken(
      token,
      config.jwt_access_secret as string
    )) as JwtPayload;
    // check user is exist
    const isUserExist = await User.findOne({
      where: { id: decoded.userId },
      attributes: {
        exclude: ["password"],
      },
    });
    if (!isUserExist) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "User not found.");
    }

    // check user role is authorized
    if (
      requiredRoles.length > 0 &&
      !requiredRoles.includes(decoded.current_role)
    ) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "User is not authorized.");
    }

    req.user = isUserExist;

    next();
  });
};

export default auth;
