import { Optional } from "sequelize";

export interface TProjectAttributes {
  id: string;
  title: string;
  description: string;
  category: string;
  requiredJobRole: string;
  requiredSkills: string[];
  timeline: string;
  paymentType: string;
  paymentRange: string;
  userId: string;
}

export interface TProjectInput extends Optional<TProjectAttributes, "id"> {}
export interface TProjectOutput extends Required<TProjectAttributes> {}
