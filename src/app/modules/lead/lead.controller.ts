import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import LeadService from "./lead.service";

const createLead = catchAsync(async (req: Request, res: Response) => {
  const lead = await LeadService.createLead(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Lead created successfully.",
    data: lead,
  });
});

const getLeadsByPortfolioId = catchAsync(
  async (req: Request, res: Response) => {
    const { portfolioId } = req.params;
    const leads = await LeadService.getLeadsByPortfolioId(portfolioId);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Leads retrieved successfully for the portfolio.",
      data: leads,
    });
  }
);

const updateLead = catchAsync(async (req: Request, res: Response) => {
  const { leadId } = req.params;
  const leadData = req.body;
  const updatedLead = await LeadService.updateLead(leadId, leadData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Lead updated successfully.",
    data: updatedLead,
  });
});

const deleteLead = catchAsync(async (req: Request, res: Response) => {
  const { leadId} = req.params;
  await LeadService.deleteLead(leadId);
  sendResponse(res, {
    success: true,
    message: "Lead deleted successfully",
    statusCode: 0,
    data: ""
  });
});

const LeadController = {
  createLead,
  updateLead,
  getLeadsByPortfolioId,
  deleteLead,
};

export default LeadController;
