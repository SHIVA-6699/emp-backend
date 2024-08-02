import { Router } from "express";
import auth from "../../../middlewares/auth";
import validateRequest from "../../../middlewares/validateRequest";
import CRMControllers from "./crm.controller";
import { createCRMValidationSchema } from "./crm.validation";

const router = Router();

// create CRM profile
router.post(
  "/create",
  auth(),
  validateRequest(createCRMValidationSchema),
  CRMControllers.createCRMProfile
);

const CRMsRoutes = router;
export default CRMsRoutes;
