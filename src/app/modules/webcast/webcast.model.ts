import { DataTypes, Model } from "sequelize";
import { TWebcastAttributes } from "./webcast.interface";
import { TWebinarInput } from "../webinar/webinar.interface";
import { sequelizeConnection } from "../../utils/sequelizeConnection";

class Webcast
  extends Model<TWebcastAttributes, TWebinarInput>
  implements TWebcastAttributes
{
  public id!: string;
  public title!: string;
  public description!: string;
  public thumbnail!: {
    public_url: string;
    secure_url: string;
    public_id: string;
  };
  public slug!: string;
  public category!: string;
  public subCategory!: string;
  public authorId!: string;
  public videoUrl!: string;
}

Webcast.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbnail: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "Webcast",
    hooks: {
      beforeCreate: lesson => {
        lesson.slug = lesson.title.replace(/\s+/g, "-").toLowerCase();
      },
    },
  }
);

export default Webcast;
