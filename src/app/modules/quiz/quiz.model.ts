import { DataTypes, Model } from "sequelize";
import { TQuestionType, TQuiz, TRedoQuiz } from "./quiz.interfac";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import { QuestionType, RedoQuiz } from "./quiz.constant";
import Lesson from "../lesson/lesson.model";

class Quiz extends Model<TQuiz> implements TQuiz {
  public id!: string;
  public category!: string;
  public options!: string[];
  public correctOption!: string;
  public lesson!: string;
  public timer!: number;
  public question!: string;
  public questionType!: TQuestionType;
  public redoQuiz!: TRedoQuiz;
}

Quiz.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lesson: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Lesson,
        key: "id",
      },
    },

    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    options: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    correctOption: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    redoQuiz: {
      type: DataTypes.ENUM(...RedoQuiz),
      allowNull: false,
    },
    questionType: {
      type: DataTypes.ENUM(...QuestionType),
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Quiz",
  }
);

Lesson.hasMany(Quiz, { foreignKey: "lesson", as: "quizzes" });
Quiz.belongsTo(Lesson, { foreignKey: "lesson", as: "lessonData" });

export default Quiz;
