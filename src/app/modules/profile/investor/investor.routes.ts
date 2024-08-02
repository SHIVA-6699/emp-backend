import { Router } from "express";
import auth from "../../../middlewares/auth";
import validateRequest from "../../../middlewares/validateRequest";
import InvestorControllers from "./investor.controller";
import { createInvestorValidationSchema } from "./investor.validation";

const router = Router();

// create Investor profile
router.post(
  "/create",
  auth(),
  validateRequest(createInvestorValidationSchema),
  InvestorControllers.createInvestorProfile
);

const InvestorsRoutes = router;
export default InvestorsRoutes;
