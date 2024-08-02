import { Router } from "express";
import auth from "../../../middlewares/auth";
import validateRequest from "../../../middlewares/validateRequest";
import { createCustomerValidationSchema } from "./customer.validations";
import CustomerControllers from "./customer.controllers";

const router = Router();

router.post(
  "/create",
  auth(),
  validateRequest(createCustomerValidationSchema),
  CustomerControllers.createCustomerProfile
);

const CustomerRoutes = router;
export default CustomerRoutes;
