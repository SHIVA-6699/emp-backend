import { Router } from "express";
import { PollAnswerController } from "./pollAnswer.controller";
import auth from "../../middlewares/auth";

const PollAnswerRoutes = Router();

PollAnswerRoutes.post(
  "/add-poll-answer",
  auth(),
  PollAnswerController.addAnswerToPoll
);

export default PollAnswerRoutes;
