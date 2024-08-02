import { Optional } from "sequelize";

export interface Thumbnail {
  secure_url: string;
  public_id: string;
  public_url: string;
}

export interface TWebcastAttributes {
  id: string;
  slug?: string;
  title: string;
  thumbnail: Thumbnail;
  videoUrl: string;
  description: string;
  category: string;
  subCategory: string;
  authorId: string;
}

export interface TWebcastInput extends Optional<TWebcastAttributes, "id"> {}
export interface TWebcastOutput extends Optional<TWebcastAttributes, "slug"> {}
