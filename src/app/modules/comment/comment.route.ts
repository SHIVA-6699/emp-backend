import { Router } from "express";
import { CommentController } from "./comment.controller";
import auth from "../../middlewares/auth";

const CommentRoutes = Router();

CommentRoutes.post("/add-comment", auth(), CommentController.addComment);
// CommentRoutes.get("/comment/:contentId", CommentController.getCommentsByContentId);
CommentRoutes.get("/delete-comment", CommentController.deleteUserComment);

export default CommentRoutes;
