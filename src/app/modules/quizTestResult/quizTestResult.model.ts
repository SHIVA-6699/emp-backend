import { DataTypes, Model } from "sequelize";
import { TQuizTestResult, TSubmittedQuiz } from "./quizTestResult.interface";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import User from "../user/user.model";
import Lesson from "../lesson/lesson.model";

class QuizTestResult extends Model<TQuizTestResult> implements TQuizTestResult {
  public id!: string;
  public userId!: string;
  public totalMark!: number;
  public achievedMark!: number;
  public lesson!: string;
  public quizzes!: TSubmittedQuiz[];
}

QuizTestResult.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    lesson: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Lesson,
        key: "id",
      },
    },
    achievedMark: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalMark: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    quizzes: DataTypes.ARRAY(DataTypes.JSONB()),
  },
  {
    sequelize: sequelizeConnection,
    modelName: "QuizTestResults",
  }
);

export default QuizTestResult;
