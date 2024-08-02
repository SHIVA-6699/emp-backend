import { Router } from "express";
import auth from "../../../middlewares/auth";
import validateRequest from "../../../middlewares/validateRequest";
import SRMControllers from "./srm.controller";
import { createSRMValidationSchema } from "./srm.validation";
import { Role } from "../../user/user.constant";

const router = Router();

// create SRM profile
router.post(
  "/create",
  auth(),
  validateRequest(createSRMValidationSchema),
  SRMControllers.createSRMProfile
);

// get all SRM profiles
router.get("/all/:jobId", auth(Role.CRM), SRMControllers.getAllSRMProfile);

const SRMsRoutes = router;
export default SRMsRoutes;
