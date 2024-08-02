import { DataTypes, Model } from "sequelize";
import { TFileAttributes } from "./file.interface";
import { sequelizeConnection } from "../../utils/sequelizeConnection";

class File extends Model implements TFileAttributes {
  public id?: string;
  public_id!: string;
  url!: string;
  secure_url!: string;
  createdAt!: string;
  updatedAt?: string;
}

File.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    public_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
    },
    secure_url: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "File",
    timestamps: true,
  }
);

export default File;
