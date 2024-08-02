import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import SmsService from "./sms.service";

const sendOTP = catchAsync(async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;

  const verificationRecord = await SmsService.sendOTP(phoneNumber);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "OTP sent successfully.",
    data: verificationRecord,
  });
});

const verifyOTP = catchAsync(async (req: Request, res: Response) => {
  const { phoneNumber, otp } = req.body;

  const isVerified = await SmsService.verifyOTP(phoneNumber, otp);

  if (isVerified) {
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Phone number verified successfully.",
    });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Invalid or expired OTP.",
    });
  }
});

const SmsController = {
  sendOTP,
  verifyOTP,
};

export default SmsController;
