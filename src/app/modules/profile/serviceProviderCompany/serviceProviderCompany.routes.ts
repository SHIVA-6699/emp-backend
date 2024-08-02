import { Router } from "express";
import auth from "../../../middlewares/auth";
import validateRequest from "../../../middlewares/validateRequest";
import ServiceProviderCompanyControllers from "./serviceProviderCompany.controller";
import { createServiceProviderCompanyValidationSchema } from "./serviceProviderCompany.validation";

const router = Router();

// create ServiceProviderCompany profile
router.post(
  "/create",
  auth(),
  validateRequest(createServiceProviderCompanyValidationSchema),
  ServiceProviderCompanyControllers.createServiceProviderCompanyProfile
);

const ServiceProviderCompanyRoutes = router;
export default ServiceProviderCompanyRoutes;
