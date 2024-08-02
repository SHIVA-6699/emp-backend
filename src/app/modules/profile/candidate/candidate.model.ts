import { DataTypes, Model } from "sequelize";
import { TCandidateAttributes } from "./candidate.interface";
import { TEngagementType } from "../../../constants/engagementType.constant";
import { TAvailabilityDate } from "../../../constants/availabilityDate.constant";
import { TPaymentType } from "../../../constants/paymentType.constant";
import { TWorkPermitType } from "../../../constants/workPermit.constant";
import { TLocationType } from "../../../constants/locationType.constant";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import Skill from "../../skill/skill.model";
import User from "../../user/user.model";
import Experience from "../../experience/experience.model";

class Candidate
  extends Model<TCandidateAttributes>
  implements TCandidateAttributes
{
  public id!: string;
  public userId!: string;
  public experience_level!: string;
  public work_model!: TLocationType;
  public work_permit!: TWorkPermitType;
  public bill_rate!: number;
  public payment_type!: TPaymentType;
  public relocation!: boolean;
  public experiences!: string[];
  public certificates!: string[];
  public video_resume!: string;
  public availability_date!: TAvailabilityDate;
  public engagement_type!: TEngagementType;
}

Candidate.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    experience_level: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    work_model: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    work_permit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bill_rate: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    payment_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    relocation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    video_resume: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    availability_date: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    engagement_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    certificates: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    experiences: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  { sequelize: sequelizeConnection, modelName: "Candidate", timestamps: true }
);

//define the candidate skill model
export class CandidateSkill extends Model {}

CandidateSkill.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "CandidateSkill",
    timestamps: false,
  }
);

// establish association between skill and candidate
Candidate.belongsToMany(Skill, {
  through: CandidateSkill,
  as: "skills",
  foreignKey: "candidateId",
});
Skill.belongsToMany(Candidate, {
  through: CandidateSkill,
  as: "candidates",
  foreignKey: "skillId",
});

// association between user and candidate
User.hasOne(Candidate, { as: "candidateProfile", foreignKey: "userId" });

Candidate.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

// association between experience and candidate
Candidate.hasMany(Experience, {
  foreignKey: "candidateId",
  as: "candidateExperiences",
});

Experience.belongsTo(Candidate, {
  foreignKey: "candidateId",
  as: "candidate",
});

export default Candidate;
