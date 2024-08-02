import { Router } from "express";
import auth from "../../../middlewares/auth";
import validateRequest from "../../../middlewares/validateRequest";
import IRMControllers from "./irm.controller";
import { createIRMValidationSchema } from "./irm.validation";

const router = Router();

// create IRM profile
router.post(
  "/create",
  auth(),
  validateRequest(createIRMValidationSchema),
  IRMControllers.createIRMProfile
);

const IRMsRoutes = router;
export default IRMsRoutes;
