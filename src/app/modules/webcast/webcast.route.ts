import { Router } from "express";
import { WebcastController } from "./webcast.controller";
import auth from "../../middlewares/auth";
import { upload } from "../../middlewares/multer.middleware";

const WebcastRoutes = Router();

WebcastRoutes.post(
  "/create-webcast",
  auth(),
  upload.single("thumbnail"),
  WebcastController.createWebcast
);
WebcastRoutes.get("/", WebcastController.getAllWebcast);
WebcastRoutes.get("/webcast/:slug", WebcastController.getAWebcast);

export default WebcastRoutes;
