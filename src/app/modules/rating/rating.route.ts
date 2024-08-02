import { Router } from "express";
import { RatingController } from "./rating.controller";

const RatingRoutes = Router();

RatingRoutes.post("/add-rating",  RatingController.addRating);
RatingRoutes.get("/rating/:contentId", RatingController.getContentRatingsCount);

export default RatingRoutes;
