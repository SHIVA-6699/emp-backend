import { Optional } from "sequelize";

export interface TRegisteredWebinarAttributes {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  userId: string;
  webinarId: string;
}

export interface TRegisteredWebinarInput
  extends Optional<TRegisteredWebinarAttributes, "id"> {}
export interface TRegisteredWebinarOutput
  extends Required<TRegisteredWebinarAttributes> {}
