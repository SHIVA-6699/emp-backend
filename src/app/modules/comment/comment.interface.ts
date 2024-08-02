import { Optional } from "sequelize";

export interface TCommentAttributes {
  id: string;
  comment: string;
  contentId: string;
  userId: string;
}

export interface TCommentInput extends Optional<TCommentAttributes, "id"> {}
export interface TCommentOutPut extends Required<TCommentAttributes>  {}
