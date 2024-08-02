import { Router } from "express";
import SmsController from "./sms.controller";
const router = Router();

router.post("/send-otp", SmsController.sendOTP);
router.post("/verify-otp", SmsController.verifyOTP);
const PhoneNumber=router;
export default PhoneNumber;
