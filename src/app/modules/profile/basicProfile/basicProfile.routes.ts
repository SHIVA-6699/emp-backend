import { Router } from "express";
import { BasicProfileControllers } from "./basicProfile.controllers";
import validateRequest from "../../../middlewares/validateRequest";
import {
  createBasicProfileValidationSchema,
  switchMyRoleValidationSchema,
  updateBasicProfileValidationSchema,
} from "./basicProfile.validation";
import auth from "../../../middlewares/auth";
import { upload } from "../../../middlewares/multer.middleware";

const BasicProfileRoutes = Router();
BasicProfileRoutes.use(auth());

BasicProfileRoutes.post(
  "/create-profile",
  validateRequest(createBasicProfileValidationSchema),
  BasicProfileControllers.createBasicProfile
);

// get my profile
BasicProfileRoutes.get("/get-me", BasicProfileControllers.getMe);

//switch my role

BasicProfileRoutes.patch(
  "/switch-role",
  validateRequest(switchMyRoleValidationSchema),
  BasicProfileControllers.switchMyRole
);

// upload my profile image
BasicProfileRoutes.post(
  "/upload-image",
  upload.single("profile_image"),
  BasicProfileControllers.uploadProfileImage
);

// update basic profile data : PATCH
BasicProfileRoutes.patch(
  "/update",
  auth(),
  validateRequest(updateBasicProfileValidationSchema),
  BasicProfileControllers.updateBasicProfile
);

export default BasicProfileRoutes;
