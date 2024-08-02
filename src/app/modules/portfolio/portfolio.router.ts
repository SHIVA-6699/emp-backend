import { Router } from "express";
import PortfolioController from "./portfolio.controller";
import { TRoleType } from "../user/user.constant";
import auth from "../../middlewares/auth";
const PortfolioRoute = Router();
const allowedRoles: TRoleType[] = ["IRM", "CRM", "SRM"];
PortfolioRoute.post(
  "/create-portfolio",
  auth(...allowedRoles),
  PortfolioController.createPortfolio
);
PortfolioRoute.get(
  "/get-portfolios",
  auth(...allowedRoles),
  PortfolioController.getPortfolios
);

export default PortfolioRoute;
