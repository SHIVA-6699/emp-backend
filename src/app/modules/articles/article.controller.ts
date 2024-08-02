import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../utils/cloudinary";
import sendResponse from "../../utils/sendResponse";
import { ArticleService } from "./article.service";

// upload article
const createArticle = catchAsync(async (req: Request, res: Response) => {
  const { title, content, enableComment, category, subCategory } = req.body;
  const thumbnailLocalPath = req.file?.path;
  let thumbnail;
  try {
    if (!thumbnailLocalPath) {
      throw new AppError(StatusCodes.NOT_FOUND, "Thumbnail not found");
    }
    thumbnail = await uploadOnCloudinary(thumbnailLocalPath, "articles");

    if (!thumbnail) {
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went wrong while uploading thumbnail"
      );
    }
    const article = {
      title,
      content,
      enableComment: enableComment === "true",
      category,
      subCategory,
      thumbnail: {
        secure_url: thumbnail.secure_url,
        public_url: thumbnail.url,
        public_id: thumbnail.public_id,
      },
      authorId: req.user.id,
    };

    const response = await ArticleService.create(article);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Article Uploaded Successfully",
      data: { response },
    });
  } catch (error) {
    await deleteFromCloudinary(thumbnail?.public_id as string, "image");
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating article"
    );
  }
});

// get all articles
const getAllArticle = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const response = await ArticleService.allArticles(query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Articles Fetched Successfully",
    data: response,
  });
});

// get single article by id
const getArticleById = catchAsync(async (req: Request, res: Response) => {
  const { slug } = req.params ;
  const result = await ArticleService.getArticleById(slug);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Articles Fetched Successfully",
    data: result,
  });
});

// get recent article by uploaded date order
const getRecentArticles = catchAsync(async (req: Request, res: Response) => {
  const result = await ArticleService.getRecentArticles();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Recent Articles Fetched Successfully",
    data: result,
  });
});

// get all article count
const getTotalArticleCount = catchAsync(async (req: Request, res: Response) => {
  const articleCount = await ArticleService.getTotalArticleCount();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Article Count Fetched Successfully",
    data: { articleCount },
  });
});
export const ArticleController = {
  createArticle,
  getAllArticle,
  getArticleById,
  getRecentArticles,
  getTotalArticleCount,
};
