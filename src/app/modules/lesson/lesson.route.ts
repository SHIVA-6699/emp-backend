import { Router } from "express";
import { upload } from "../../middlewares/multer.middleware";
import { LessonController } from "./lesson.controller";

const LessonRoutes = Router();

LessonRoutes.get("/all-lessons", LessonController.getAllLessons);
LessonRoutes.post(
  "/create-lesson",
  upload.single("thumbnail"),
  LessonController.createLesson
);
LessonRoutes.get("/lesson/:slug", LessonController.getLessonById);
LessonRoutes.get("/recent-lessons", LessonController.getRecentLessons);
LessonRoutes.get("/lesson-count", LessonController.getTotalLessonCount);
LessonRoutes.get("/quizzes", LessonController.getAllLessonsQuizzes);

export default LessonRoutes;
