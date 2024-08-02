import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { createProjectValidationSchema } from "./project.validation";
import { ProjectController } from "./project.controller";

const ProjectRoutes = Router();

ProjectRoutes.post(
  "/create-project",
  auth(),
  validateRequest(createProjectValidationSchema),
  ProjectController.createProject
);

ProjectRoutes.get("/", ProjectController.getAllProjects);

export default ProjectRoutes;
