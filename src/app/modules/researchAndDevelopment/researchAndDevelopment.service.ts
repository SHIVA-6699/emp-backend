import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TResearchAndDevelopmentInput } from "./researchAndDevelopment.interface";
import ResearchAndDevelopment from "./researchAndDevelopment.model";

const create = async (payload: TResearchAndDevelopmentInput) => {
  try {
    const result = await ResearchAndDevelopment.create(payload);
    return result.dataValues;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating research and development."
    );
  }
};

const getAllResearchAndDevelopments = async (
  query: Record<string, unknown>
) => {
  const { category } = query;

  const queryOptions: { where?: { category: string } } = {};
  if (category) {
    queryOptions.where = { category: category as string };
  }

  const result = await ResearchAndDevelopment.findAll(queryOptions);
  return result;
};

// get a single lesson
const getResearchAndDevelopmentById = async (payload: string) => {
  const result = await ResearchAndDevelopment.findOne({
    where: { slug: payload },
  });
  if (!result) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while getting all research and development"
    );
  }
  return result;
};

// get recent lesson
const getRecentResearchAndDevelopments = async () => {
  try {
    const result = await ResearchAndDevelopment.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
    });
    if (!result || result.length === 0) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "No recent research and development found"
      );
    }

    return result;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while fetching recent research and development"
    );
  }
};

// get total lesson count
const getTotalResearchAndDevelopmentCount = async () => {
  const result = await ResearchAndDevelopment.findAndCountAll();
  if (!result) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while fetching recent research and development"
    );
  }
  return result.count;
};

export const ResearchAndDevelopmentService = {
  create,
  getAllResearchAndDevelopments,
  getRecentResearchAndDevelopments,
  getResearchAndDevelopmentById,
  getTotalResearchAndDevelopmentCount,
};
