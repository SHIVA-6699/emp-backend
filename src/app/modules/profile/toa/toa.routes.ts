import { Router } from "express";
import auth from "../../../middlewares/auth";
import validateRequest from "../../../middlewares/validateRequest";
import TOAControllers from "./toa.controller";
import { createTOAValidationSchema } from "./toa.validation";

const router = Router();

// create TOA profile
router.post(
  "/create",
  auth(),
  validateRequest(createTOAValidationSchema),
  TOAControllers.createTOAProfile
);

const TOAsRoutes = router;
export default TOAsRoutes;
