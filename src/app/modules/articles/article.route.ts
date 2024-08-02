import { Router } from "express";
import auth from "../../middlewares/auth";
import { upload } from "../../middlewares/multer.middleware";
import { ArticleController } from "./article.controller";

const ArticleRoutes = Router();

ArticleRoutes.get("/all-articles", ArticleController.getAllArticle);
ArticleRoutes.post(
  "/create-article",
  auth(),
  upload.single("thumbnail"),
  ArticleController.createArticle
);

ArticleRoutes.get("/article/:slug", ArticleController.getArticleById);
ArticleRoutes.get("/recent-articles", ArticleController.getRecentArticles);
ArticleRoutes.get("/article-count", ArticleController.getTotalArticleCount);

export default ArticleRoutes;
