import { Optional } from "sequelize";

export interface TPollAttribute {
  id: string;
  question: string;
}
export interface TPollInput extends Optional<TPollAttribute, "id"> {}
export interface TPollOutPut extends Required<TPollAttribute> {}
