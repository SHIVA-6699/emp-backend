import { Router } from "express";
import AdminController from "./admin.controller";

const AdminRoute = Router();

AdminRoute.post("/admin-login", AdminController.loginAdmin);
// CommentRoutes.get("/comment/:contentId", CommentController.getCommentsByContentId);

export default AdminRoute;
