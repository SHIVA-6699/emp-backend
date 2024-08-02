import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import { TLessonAttributes, TLessonInput } from "./lesson.interface";
// import Quiz from "../quiz/quiz.model";

class Lesson
  extends Model<TLessonAttributes, TLessonInput>
  implements TLessonAttributes
{
  public id!: string;
  public title!: string;
  public thumbnail!: {
    secure_url: string;
    public_url: string;
    public_id: string;
  };
  public slug!: string;
  public content!: string;
  public category!: string;
  public subCategory!: string;
  public authorId!: string;
}

Lesson.init(
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
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
      // set() {
      //   const title = this.getDataValue("title");
      //   this.setDataValue("slug", title.toLowerCase().replace(" ", "-"));
      // },
    },
    thumbnail: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subCategory: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    authorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // quizzes: {
    //   type: DataTypes.ARRAY(DataTypes.UUID),
    //   allowNull: true,
    //   references: {
    //     model: Quiz,
    //     key: "id",
    //   },
    // },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Lesson",
    timestamps: true,
    hooks: {
      beforeCreate: lesson => {
        lesson.slug = lesson.title.replace(/\s+/g, "-").toLowerCase();
      },
    },
  }
);
export default Lesson;
