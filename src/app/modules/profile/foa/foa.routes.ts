import { Router } from "express";
import auth from "../../../middlewares/auth";
import validateRequest from "../../../middlewares/validateRequest";
import FOAControllers from "./foa.controller";
import { createFOAValidationSchema } from "./foa.validation";

const router = Router();

// create FOA profile
router.post(
  "/create",
  auth(),
  validateRequest(createFOAValidationSchema),
  FOAControllers.createFOAProfile
);

const FOAsRoutes = router;
export default FOAsRoutes;
