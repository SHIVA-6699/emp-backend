import { Router } from "express";
import { upload } from "../../middlewares/multer.middleware";
import { ResearchAndDevelopmentController } from "./researchAndDevelopment.controller";

const ResearchAndDevelopmentRoutes = Router();

ResearchAndDevelopmentRoutes.get(
  "/all-research-and-developments",
  ResearchAndDevelopmentController.getAllResearchAndDevelopments
);
ResearchAndDevelopmentRoutes.post(
  "/create-research-and-development",
  upload.single("thumbnail"),
  ResearchAndDevelopmentController.createResearchAndDevelopment
);
ResearchAndDevelopmentRoutes.get(
  "/research-and-development/:slug",
  ResearchAndDevelopmentController.getResearchAndDevelopmentById
);
ResearchAndDevelopmentRoutes.get(
  "/recent-research-and-developments",
  ResearchAndDevelopmentController.getRecentResearchAndDevelopments
);
ResearchAndDevelopmentRoutes.get(
  "/research-and-developments-count",
  ResearchAndDevelopmentController.getTotalResearchAndDevelopmentCount
);

export default ResearchAndDevelopmentRoutes;
