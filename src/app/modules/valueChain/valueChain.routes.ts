import { Router } from "express";
import ValueChainControllers from "./valueChain.controllers";

const router = Router();

// get all value chains : GET
router.get("/", ValueChainControllers.getAllValueChain);
const ValueChainRoutes = router;
export default ValueChainRoutes;
