import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";
import SmsVerification from "./sms.model";

const snsClient = new SNSClient([{ region: "ap-south-1" ,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
}]);

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};

const sendOTP = async (phoneNumber: string): Promise<SmsVerification> => {
  const otp = generateOTP();
  const params = {
    Message: `Your verification code is ${otp}`,
    PhoneNumber: phoneNumber,
  };

  try {
    const command = new PublishCommand(params);
    await snsClient.send(command);
    const verificationRecord = await SmsVerification.create({
      phoneNumber,
      otp,
    });
    return verificationRecord;
  } catch (error) {
    console.error("Failed to send OTP:", error);
    throw new Error("Failed to send OTP");
  }
};

const verifyOTP = async (
  phoneNumber: string,
  otp: string
): Promise<boolean> => {
  const verificationRecord = await SmsVerification.findOne({
    where: {
      phoneNumber,
      otp,
    },
  });
  if (verificationRecord) {
    await verificationRecord.destroy();
    return true;
  }
  return false;
};

const SmsService = {
  sendOTP,
  verifyOTP,
};

export default SmsService;
