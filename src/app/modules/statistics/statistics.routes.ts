import { Router } from "express";
import StatisticsController from "./statistics.controllers";

const router = Router();

// get all data counts
router.get("/get-counts", StatisticsController.getAllDataCount);

const StatisticsRoutes = router;
export default StatisticsRoutes;
