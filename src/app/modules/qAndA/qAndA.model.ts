/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import { TQAndA } from "./qAndA.interface";

class QAndA extends Model<TQAndA> implements TQAndA {
  public id!: string;
  public category!: string;
  public title!: string;
  public description!: string;
  public file?: any;
}

QAndA.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    file: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Other model options go here
    sequelize: sequelizeConnection, // We need to pass the connection instance
    modelName: "QAndA", // We need to choose the model name
  }
);

export default QAndA;
