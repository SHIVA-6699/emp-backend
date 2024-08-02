import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import PortfolioService from "./portfolio.service";

const createPortfolio = catchAsync(async (req: Request, res: Response) => {
  const portfolio = await PortfolioService.createPortfolio(req.body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Portfolio created successfully.",
    data: portfolio,
  });
});

const getPortfolios = catchAsync(async (req: Request, res: Response) => {
  const portfolios = await PortfolioService.getPortfolios();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Portfolios retrieved successfully.",
    data: portfolios,
  });
});

const PortfolioController = {
  createPortfolio,
  getPortfolios,
};

export default PortfolioController;
