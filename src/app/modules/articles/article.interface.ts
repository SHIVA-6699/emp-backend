import { Optional } from "sequelize";

export interface Thumbnail {
  secure_url: string;
  public_id: string;
  public_url: string;
}
export interface TArticleAttributes {
  id: string;
  title: string;
  thumbnail: Thumbnail;
  content: string;
  slug?: string;
  category: string;
  subCategory: string;
  authorId: string;
  enableComment: boolean;
}

export interface TArticleInput extends Optional<TArticleAttributes, "id"> {}
