import { TCommentInput, TCommentOutPut } from "./comment.interface";
import Comment from "./comment.model";

const create = async (payload: TCommentInput): Promise<TCommentOutPut> => {
  const result = await Comment.create(payload);
  return result.dataValues;
};

const getAllContentComments = async (
  payload: string
): Promise<TCommentOutPut[]> => {
  const result = await Comment.findAll({
    where: {
      contentId: payload,
    },
    order: [["createdAt", "DESC"]],
  });
  return result;
};

const deleteComment = async (payload: string) => {
  const result = await Comment.destroy({ where: { userId: payload } });
  return result;
};

export const CommentService = {
  create,
  getAllContentComments,
  deleteComment,
};
