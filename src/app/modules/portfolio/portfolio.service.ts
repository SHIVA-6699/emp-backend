import { Optional } from "sequelize";
import { TPortfolio } from "./portfolio.interface";
import Portfolio from "./portfolio.model";

const createPortfolio = async (
  payload: Optional<TPortfolio, "id">
): Promise<Portfolio> => {
  const portfolio = await Portfolio.create(payload);
  return portfolio;
};

const getPortfolios = async (): Promise<Portfolio[]> => {
  const portfolios = await Portfolio.findAll();
  return portfolios;
};

const PortfolioService = {
  createPortfolio,
  getPortfolios,
};

export default PortfolioService;
