import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { createInterviewValidationSchema } from "./interview.validation";
import { InterviewController } from "./interview.controller";

const InterviewRoutes = Router();

InterviewRoutes.post(
  "/create-interview",
  auth(),
  validateRequest(createInterviewValidationSchema),
  InterviewController.createInterview
);

InterviewRoutes.get("/", InterviewController.getAllInterviews);
InterviewRoutes.get("interview/:id", InterviewController.getInterviewDetails);

export default InterviewRoutes;
