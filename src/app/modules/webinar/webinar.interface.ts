import { Optional } from "sequelize";

export interface Thumbnail {
  secure_url: string;
  public_id: string;
  public_url: string;
}

export interface TWebinarAttributes {
  id: string;
  thumbnail?: Thumbnail;
  title: string;
  slug?: string;
  description: string;
  authorId: string;
  category: string;
  subCategory: string;
}

export interface TWebinarInput extends Optional<TWebinarAttributes, "id"> {}
export interface TWebinarOutput extends Optional<TWebinarAttributes, "slug"> {}
