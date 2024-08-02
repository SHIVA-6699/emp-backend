import { DataTypes, Model } from "sequelize";
import {
  TJobAttributes,
  TJobInput,
  TJobStatus,
  TLabelValuePair,
} from "./job.interface";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import User from "../user/user.model";

class Job extends Model<TJobAttributes, TJobInput> implements TJobAttributes {
  public id!: string;
  public userId!: string;
  public status!: TJobStatus;
  public jobId!: string;
  public jobRole!: string;
  public jobDescription!: string;
  public city!: string;
  public state!: string;
  public country!: string;
  public zipCode!: string;
  public customerEngagementTypes!: TLabelValuePair[];
  public durations!: TLabelValuePair[];
  public empowerBondTypes!: TLabelValuePair[];
  public experienceLevels!: TLabelValuePair[];
  public paymentRanges!: TLabelValuePair[];
  public paymentType!: string;
  public skills!: TLabelValuePair[];
  public startDates!: TLabelValuePair[];
  public volume!: number;
  public workModels!: TLabelValuePair[];
  public workPermits!: TLabelValuePair[];
  public interviewModels!: TLabelValuePair[];
}

Job.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        key: "id",
        model: User,
      },
    },
    jobId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
      allowNull: false,
      defaultValue: "INACTIVE",
    },
    jobRole: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jobDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    customerEngagementTypes: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    durations: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    empowerBondTypes: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    experienceLevels: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    paymentRanges: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    paymentType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    skills: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    startDates: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    volume: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    workModels: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    workPermits: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    interviewModels: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  },
  { timestamps: true, sequelize: sequelizeConnection, modelName: "Job" }
);

Job.belongsTo(User, { foreignKey: "userId" });

export default Job;
