import { Router } from "express";
import auth from "../../../middlewares/auth";
import validateRequest from "../../../middlewares/validateRequest";
import { createInterviewerValidationSchema } from "./interviewer.validation";
import InterviewerControllers from "./interviewer.controller";

const router = Router();

// create interviewer profile
router.post(
  "/create",
  auth(),
  validateRequest(createInterviewerValidationSchema),
  InterviewerControllers.createInterviewerProfile
);

const InterviewersRoute = router;
export default InterviewersRoute;
