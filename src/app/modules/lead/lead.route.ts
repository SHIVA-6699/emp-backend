import { Router } from "express";
import LeadController from "./lead.controller";
import { TRoleType } from "../user/user.constant";
import auth from "../../middlewares/auth";
const LeadRoute = Router();
const allowedRoles: TRoleType[] = ["IRM", "CRM", "SRM"];
LeadRoute.post(
  "/create-lead",
  auth(...allowedRoles),
  LeadController.createLead
);
LeadRoute.put("/update-lead/:leadId", LeadController.updateLead);
// LeadRoute.get("/get-leads", LeadController.getLeads);
LeadRoute.get(
  "/get-leads-by-portfolio/:portfolioId",
  auth(...allowedRoles),
  LeadController.getLeadsByPortfolioId
);
LeadRoute.delete(
  "/delete-lead/:leadId",
  auth(...allowedRoles),
  LeadController.deleteLead
);

export default LeadRoute;
