import { Router } from "express";
import auth from "../../middlewares/auth";
import { RegisteredWebinarController } from "./registeredWebinar.controller";

const RegisteredWebinarRoutes = Router();

RegisteredWebinarRoutes.post(
  "/register",
  auth(),
  RegisteredWebinarController.registerForWebinar
);

export default RegisteredWebinarRoutes;
