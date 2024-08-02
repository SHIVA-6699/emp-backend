import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createQAndAValidationSchema } from "./qAndA.validation";
import QAndAController from "./qAndA.controller";

const router = Router();

router.post(
  "/create",
  validateRequest(createQAndAValidationSchema),
  QAndAController.createQAndA
);

router.get("/getAll", QAndAController.getAllQAndA);

const QAndARoute = router;
export default QAndARoute;
