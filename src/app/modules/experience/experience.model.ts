import { DataTypes, Model } from "sequelize";
import { TExperienceAttributes } from "./experience.interface";
import { TEmploymentType } from "../../constants/employmentType.constant";
import { TLocationType } from "../../constants/locationType.constant";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import Skill from "../skill/skill.model";
import Candidate from "../profile/candidate/candidate.model";

class Experience
  extends Model<TExperienceAttributes>
  implements TExperienceAttributes
{
  public id!: string;
  public title!: string;
  public employment_type!: TEmploymentType;
  public location_type!: TLocationType;
  public company_name!: string;
  public location!: string;
  public start_date!: string;
  public end_date!: string;
  public isWorking!: boolean;
  public candidateId!: string;

  public readonly createdAt!: string;
  public readonly updatedAt!: string;
}

Experience.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employment_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isWorking: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    candidateId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Candidate,
        key: "id",
      },
    },
  },
  { timestamps: true, sequelize: sequelizeConnection, modelName: "Experience" }
);

//define the experience skill model
export class ExperienceSkill extends Model {}

ExperienceSkill.init(
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
    modelName: "ExperienceSkill",
    timestamps: false,
  }
);

// establish association between skill and candidate
Experience.belongsToMany(Skill, {
  through: ExperienceSkill,
  as: "skills",
  foreignKey: "experienceId",
});
Skill.belongsToMany(Experience, {
  through: ExperienceSkill,
  as: "experienceSkills",
  foreignKey: "skillId",
});

export default Experience;
