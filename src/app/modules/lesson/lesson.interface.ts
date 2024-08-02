import { Optional } from "sequelize";

export interface Thumbnail {
  secure_url: string;
  public_id: string;
  public_url: string;
}
export interface TLessonAttributes {
  id: string;
  title: string;
  thumbnail: Thumbnail;
  content: string;
  slug?: string;
  category: string;
  subCategory?: string;
  authorId: string;
}

export interface TLessonInput extends Optional<TLessonAttributes, "id"> {}

// export interface TLessonInput {
//   title: string;
//   thumbnail: string;
//   content: string;
//   category: string;
//   subCategory: string;
//   authorId: string;
//   enableComment: boolean;
// }
