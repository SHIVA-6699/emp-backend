import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";
import { TInterviewerAttributes } from "./interviewer.interface";
import Skill from "../../skill/skill.model";
import Experience from "../../experience/experience.model";

// TODO: add availability slot, certifications
class Interviewer
  extends Model<TInterviewerAttributes>
  implements TInterviewerAttributes
{
  public id!: string;
  public userId!: string;
}

Interviewer.init(
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
      references: {
        model: User,
        key: "id",
      },
    },
  },
  { timestamps: true, sequelize: sequelizeConnection, modelName: "Interviewer" }
);

User.hasOne(Interviewer, { as: "interviewerProfile", foreignKey: "userId" });

Interviewer.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

export class InterviewerSkill extends Model {}
InterviewerSkill.init(
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
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "InterviewerSkill",
  }
);

Interviewer.belongsToMany(Skill, {
  through: InterviewerSkill,
  as: "skills",
  foreignKey: "interviewerId",
});
Skill.belongsToMany(Skill, {
  through: InterviewerSkill,
  as: "interviewerSkills",
  foreignKey: "skillId",
});

export class InterviewerExperience extends Model {}
InterviewerExperience.init(
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
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "InterviewerExperience",
  }
);

Interviewer.belongsToMany(Experience, {
  foreignKey: "interviewerId",
  as: "interviewerExperiences",
  through: InterviewerExperience,
});
Experience.belongsToMany(Interviewer, {
  foreignKey: "experienceId",
  as: "interviewerExperiences",
  through: InterviewerExperience,
});

export default Interviewer;
