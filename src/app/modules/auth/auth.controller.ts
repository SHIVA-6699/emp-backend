import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AuthService from "./auth.service";
import config from "../../config";

// register
const register = catchAsync(async (req, res) => {
  const result = await AuthService.register(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    // message: "Verification email sent.",
    message: "User registered successfully.",
    data: result,
  });
});

// verify account
const verifyAccount = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  const { accessToken, refreshToken } = await AuthService.verifyAccount(
    token as string
  );

  // set cookie
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "development" ? true : false,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "User created in successfully.",
    data: { accessToken },
  });
});

// login
const login = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await AuthService.login(req.body);

  // set cookie
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "development" ? true : false,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User logged in successfully.",
    data: { accessToken },
  });
});

// refresh token
const refreshToken = catchAsync(async (req, res) => {
  const token = req.cookies.refreshToken;
  const result = await AuthService.refreshToken(token);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Access token retrieved successfully.",
    data: result,
  });
});

const AuthController = {
  register,
  login,
  verifyAccount,
  refreshToken,
};

export default AuthController;
