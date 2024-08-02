import { Optional } from "sequelize";

export interface TRatingAttributes {
  id: string;
  contentId: string;
  userId: string;
  rating: number;
}

export interface TRatingInput extends Optional<TRatingAttributes, "id"> {}
export interface TRatingOutput extends Required<TRatingAttributes> {}
