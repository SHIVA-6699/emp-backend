import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TArticleInput } from "./article.interface";
import Article from "./article.model";

const create = async (payload: TArticleInput) => {
  try {
    const result = await Article.create(payload);
    return result.dataValues;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Could not create article"
    );
  }
};

// get all articles
const allArticles = async (query: Record<string, unknown>) => {
  const { category } = query;

  const queryOptions: { where?: { category: string } } = {};
  if (category) {
    queryOptions.where = { category: category as string };
  }

  const result = await Article.findAll(queryOptions);
  return result;
};

// get a single article
const getArticleById = async (payload: string) => {
  try {
    const result = await Article.findOne({
      where: { slug: payload },
    });
    return result;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while getting all article"
    );
  }
};

// get recent article
const getRecentArticles = async () => {
  try {
    const result = await Article.findAll({
      order: [["createdAt", "DESC"]],
      limit: 5,
    });
    if (!result || result.length === 0) {
      throw new AppError(StatusCodes.NOT_FOUND, "No recent articles found");
    }

    return result;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while fetching recent articles"
    );
  }
};

// get total article   count
const getTotalArticleCount = async () => {
  try {
    const result = await Article.findAndCountAll();
    return result.count;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while fetching recent articles"
    );
  }
};

export const ArticleService = {
  create,
  allArticles,
  getArticleById,
  getRecentArticles,
  getTotalArticleCount,
};
