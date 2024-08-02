import { Router } from "express";
import { PollController } from "./poll.controller";

const PollRoutes = Router();

PollRoutes.post("/create-poll", PollController.createPoll);
PollRoutes.get("/get-all", PollController.getAllPolls);

export default PollRoutes;
