import { DataTypes, Model } from "sequelize";
import {
  TInterviewAttributes,
  TInterviewInput,
  TLabelValuePair,
} from "./interview.interface";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import User from "../user/user.model";

class Interview
  extends Model<TInterviewAttributes, TInterviewInput>
  implements TInterviewAttributes
{
  public id!: string;
  public userId!: string;
  public interviewId!: string;
  public jobDescription!: string;
  public skills!: TLabelValuePair[];
  public jobRoles!: TLabelValuePair[];
  public interviewTypes!: TLabelValuePair[];
}

Interview.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        key: "id",
        model: User,
      },
    },
    interviewId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    skills: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    jobRoles: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    interviewTypes: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  { timestamps: true, sequelize: sequelizeConnection, modelName: "Interviews" }
);

export default Interview;
