import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import { CommentService } from "./comment.service";
import AppError from "../../errors/AppError";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse";
const addComment = catchAsync(async (req: Request, res: Response) => {
  try {
    const { comment, contentId } = req.body;
    const userId = req?.user.id;
    if (!userId) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }
    if (!comment || !contentId) {
      throw new AppError(
        StatusCodes.NOT_FOUND,
        "Comment or ContentId not found"
      );
    }
    const response = await CommentService.create({
      comment,
      contentId,
      userId,
    });

    sendResponse(res, {
      data: response,
      message: "Comment Added Successfully",
      statusCode: StatusCodes.CREATED,
      success: true,
    });
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while adding comment"
    );
  }
});

/* const getCommentsByContentId = catchAsync(
  async (req: Request, res: Response) => {
    try {
      const { contentId } = req.params;
      if (!contentId) {
        throw new AppError(StatusCodes.NOT_FOUND, "ContentId not found");
      }
      const resObject = [];
      const response = await CommentService.getAllContentComments(contentId);
      for (const comment of response) {
        const userInfo = await ProfileHeaderSection.findOne({
          where: {
            user: comment.userId || null, // you have to change here beacuse i changed the profile modal 
          },
          attributes: ["name", "email"],
        });
        resObject.push({ userInfo, comment });
      }
      sendResponse(res, {
        data: resObject,
        message: "Comments Fetched Successfully",
        success: true,
        statusCode: StatusCodes.OK,
      });
    } catch (error) {
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Something went wrong while fetching comments"
      );
    }
  }
); */

const deleteUserComment = catchAsync(async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      throw new AppError(StatusCodes.NOT_FOUND, "User not found");
    }
    await CommentService.deleteComment(userId);
    sendResponse(res, {
      data: {},
      message: "Comment Deleted Successfully",
      success: true,
      statusCode: StatusCodes.OK,
    });
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while deleting comments"
    );
  }
});

export const CommentController = {
  addComment,
  // getCommentsByContentId,
  deleteUserComment,
};
