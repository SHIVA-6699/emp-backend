import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "../user/user.constant";
import {
  changeJobInvitationStatusValidationSchema,
  inviteJobToCandidateValidationSchema,
} from "./jobInvitationToCandidate.validations";
import validateRequest from "../../middlewares/validateRequest";
import JobInvitationToCandidateControllers from "./jobInvitationToCandidate.controllers";

const router = Router();

// invite job to candidate : POST
router.post(
  "/invite",
  auth(Role.SRM),
  validateRequest(inviteJobToCandidateValidationSchema),
  JobInvitationToCandidateControllers.inviteJobToCandidate
);

// get all invitations for  candidate
router.get(
  "/candidate/all",
  auth(Role.CANDIDATE),
  JobInvitationToCandidateControllers.getAllInvitationsForCandidate
);
// get all invitations for  srm
router.get(
  "/srm/all",
  auth(Role.SRM),
  JobInvitationToCandidateControllers.getAllJobInvitationForSrm
);

// get single job invitation for candidate : GET
router.get(
  "/candidate/:jobInvitationId",
  auth(Role.CANDIDATE),
  JobInvitationToCandidateControllers.getSingleJobInvitationById
);

// change job assignment status : PATCH
router.patch(
  "/change-status/:jobInvitationId",
  auth(Role.CANDIDATE),
  validateRequest(changeJobInvitationStatusValidationSchema),
  JobInvitationToCandidateControllers.changeJobInvitationStatus
);

const JobInvitationToCandidateRoutes = router;
export default JobInvitationToCandidateRoutes;
