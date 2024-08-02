import { DataTypes, Model } from "sequelize";
import { TWebinarAttributes, TWebinarInput } from "./webinar.interface";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import User from "../user/user.model";

class Webinar
  extends Model<TWebinarAttributes, TWebinarInput>
  implements TWebinarAttributes
{
  public id!: string;
  public title!: string;
  public slug!: string;
  public thumbnail!: {
    secure_url: string;
    public_url: string;
    public_id: string;
  };
  public description!: string;
  public authorId!: string;
  public category!: string;
  public subCategory!: string;
}

Webinar.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "Webinar",
    hooks: {
      beforeCreate: webinar => {
        webinar.slug = webinar.title.replace(/\s+/g, "-").toLowerCase();
      },
    },
  }
);

export default Webinar;
