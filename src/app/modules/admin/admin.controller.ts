import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import AdminService from "./admin.service";
import config from "../../config";

// login admin
const loginAdmin = catchAsync(async (req, res) => {
  const { accessToken, refreshToken } = await AdminService.loginAdmin(req.body);

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "development" ? true : false,
  });

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Admin logged in successfully.",
    data: { accessToken },
  });
});

const AdminController = {
  loginAdmin,
};

export default AdminController;
