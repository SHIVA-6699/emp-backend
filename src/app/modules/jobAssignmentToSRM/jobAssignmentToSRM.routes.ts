import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import {
  assignJobToSRMValidationSchema,
  changeJobAssignmentStatusValidationSchema,
} from "./jobAssignmentToSRM.validations";
import JobAssignmentToSRMControllers from "./jobAssignmentToSRM.controllers";
import { Role } from "../user/user.constant";

const router = Router();

// assign job to SRMs : POST
router.post(
  "/assign",
  auth(Role.CRM),
  validateRequest(assignJobToSRMValidationSchema),
  JobAssignmentToSRMControllers.assignJobToSRM
);

// all job assignment for srm : GET
router.get(
  "/assigned-jobs/srm/all",
  auth(Role.SRM),
  JobAssignmentToSRMControllers.getAllJobAssignmentsForSRM
);
// all job assignment for crm : GET
router.get(
  "/crm/all",
  auth(Role.CRM),
  JobAssignmentToSRMControllers.getAllJobAssignmentsForCrm
);

// get single job assignment for srm : GET
router.get(
  "/srm/:jobAssignmentId",
  auth(Role.SRM),
  JobAssignmentToSRMControllers.getSingleJobAssignmentById
);

// change job assignment status : PATCH
router.patch(
  "/change-status/:jobAssignmentId",
  auth(Role.SRM),
  validateRequest(changeJobAssignmentStatusValidationSchema),
  JobAssignmentToSRMControllers.changeJobAssignmentStatus
);
const JobAssignmentToSRMRoutes = router;

export default JobAssignmentToSRMRoutes;
