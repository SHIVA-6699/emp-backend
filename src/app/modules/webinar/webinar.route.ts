import { Router } from "express";
import { WebinarController } from "./webinar.controller";
import { upload } from "../../middlewares/multer.middleware";
import auth from "../../middlewares/auth";

const WebinarRoutes = Router();

WebinarRoutes.post(
  "/create-webinar",
  auth(),
  upload.single("thumbnail"),
  WebinarController.createWebinar
);
WebinarRoutes.get("/", WebinarController.getAllWebinars);
WebinarRoutes.get("/webinar/:slug", WebinarController.getWebinarById);
WebinarRoutes.delete("/delete-webinar", WebinarController.deleteWebinar);

export default WebinarRoutes;
