import { Router } from "express";
import auth from "../../middlewares/auth";
import { createJobValidationSchema } from "./job.validation";
import validateRequest from "../../middlewares/validateRequest";
import { JobController } from "./job.controller";

const JobRoutes = Router();

JobRoutes.post(
  "/create-job",
  auth(),
  validateRequest(createJobValidationSchema),
  JobController.createJob
);

JobRoutes.get("/", JobController.getAllJobs);
JobRoutes.get("/job/:id", auth(), JobController.getJobDetails);
JobRoutes.get(
  "/job-details/:id",
  JobController.getJobDetailsWithCandidatesAndInvitees
);

export default JobRoutes;
