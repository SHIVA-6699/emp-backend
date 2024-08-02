import { Router } from "express";
import auth from "../../../middlewares/auth";
import validateRequest from "../../../middlewares/validateRequest";
import {
  addCandidateExperienceValidationSchema,
  createCandidateValidationSchema,
  updateCandidateExperienceValidationSchema,
  updateCandidateValidationSchema,
} from "./candidate.validation";
import CandidateControllers from "./candidate.controller";
import { Role } from "../../user/user.constant";

const router = Router();

// create candidate profile : POST
router.post(
  "/create",
  auth(),
  validateRequest(createCandidateValidationSchema),
  CandidateControllers.createCandidateProfile
);

// update candidate profile : PATCH
router.patch(
  "/update",
  auth(),
  validateRequest(updateCandidateValidationSchema),
  CandidateControllers.updateCandidateProfile
);

// add candidate experience : POST
router.post(
  "/add-experience",
  auth(),
  validateRequest(addCandidateExperienceValidationSchema),
  CandidateControllers.addCandidateNewExperience
);

//update candidate experience : PATCH
router.patch(
  "/update-experience/:experienceId",
  auth(),
  validateRequest(updateCandidateExperienceValidationSchema),
  CandidateControllers.updateCandidateExperience
);

// get all candidate profiles : GET
router.get(
  "/get-all/:jobAssignmentId",
  auth(Role.SRM),
  CandidateControllers.getAllCandidatesForSrm
);
const CandidateRoutes = router;
export default CandidateRoutes;
