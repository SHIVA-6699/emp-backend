// backend/services/twilio.service.ts
import { Twilio } from "twilio";
const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER!;

const client = new Twilio(accountSid, authToken);

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};

const sendOTP = async (phoneNumber: string): Promise<string> => {
  const otp = generateOTP();

  try {
    await client.messages.create({
      body: `Your verification code is ${otp}`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    return otp;
  } catch (error) {
    console.error("Failed to send OTP:", error);
    throw new Error("Failed to send OTP");
  }
};

export default {
  sendOTP,
};
