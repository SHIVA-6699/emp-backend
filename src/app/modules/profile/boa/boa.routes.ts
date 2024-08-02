import { Router } from "express";
import auth from "../../../middlewares/auth";
import validateRequest from "../../../middlewares/validateRequest";
import BOAControllers from "./boa.controller";
import { createBOAValidationSchema } from "./boa.validation";

const router = Router();

// create BOA profile
router.post(
  "/create",
  auth(),
  validateRequest(createBOAValidationSchema),
  BOAControllers.createBOAProfile
);

const BOAsRoutes = router;
export default BOAsRoutes;
