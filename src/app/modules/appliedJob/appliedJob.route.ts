import { Router } from "express";
import auth from "../../middlewares/auth";
import { AppliedJobControllers } from "./appliedJob.controller";

const AppliedJobRoutes = Router();

AppliedJobRoutes.use(auth());

AppliedJobRoutes.post("/apply", AppliedJobControllers.applyToJob);

export default AppliedJobRoutes