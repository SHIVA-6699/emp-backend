import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import {
  loginValidationSchema,
  refreshTokenValidationSchema,
  registrationValidationSchema,
} from "./auth.validation";
import AuthController from "./auth.controller";

const router = Router();

// register : POST
router.post(
  "/register",
  validateRequest(registrationValidationSchema),
  AuthController.register
);

// verify account : POST
router.post("/verify-account", AuthController.verifyAccount);

// login : POST
router.post(
  "/login",
  validateRequest(loginValidationSchema),
  AuthController.login
);

// refresh token  : POST
router.post(
  "/refresh-token",
  validateRequest(refreshTokenValidationSchema),
  AuthController.refreshToken
);
const AuthRoutes = router;
export default AuthRoutes;
