import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { createPodcastValidationSchema } from "./podcast.validation";
import PodcastController from "./podcast.controller";

const router = Router();

router.post(
  "/create",
  validateRequest(createPodcastValidationSchema),
  PodcastController.createPodcast
);

router.get("/getAll", PodcastController.getAllPodcasts);

const PodcastRoute = router;
export default PodcastRoute;
