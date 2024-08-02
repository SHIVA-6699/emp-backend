import { DataTypes, Model } from "sequelize";
import { TProjectAttributes, TProjectInput } from "./project.interface";
import { sequelizeConnection } from "../../utils/sequelizeConnection";

class Project
  extends Model<TProjectAttributes, TProjectInput>
  implements TProjectAttributes
{
  readonly id!: string;
  public title!: string;
  public description!: string;
  public category!: string;
  public requiredJobRole!: string;
  public requiredSkills!: string[];
  public timeline!: string;
  public paymentType!: string;
  public paymentRange!: string;
  public userId!: string;
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requiredJobRole: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requiredSkills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    timeline: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentRange: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, sequelize: sequelizeConnection, modelName: "Project" }
);

export default Project;
