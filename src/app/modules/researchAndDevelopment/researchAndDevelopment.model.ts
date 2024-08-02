import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import {
  TResearchAndDevelopmentAttributes,
  TResearchAndDevelopmentInput,
} from "./researchAndDevelopment.interface";
// import Quiz from "../quiz/quiz.model";

class ResearchAndDevelopment
  extends Model<TResearchAndDevelopmentAttributes, TResearchAndDevelopmentInput>
  implements TResearchAndDevelopmentAttributes
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

ResearchAndDevelopment.init(
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
    modelName: "ResearchAndDevelopment",
    timestamps: true,
    hooks: {
      beforeCreate: researchAndDevelopment => {
        researchAndDevelopment.slug = researchAndDevelopment.title
          .replace(/\s+/g, "-")
          .toLowerCase();
      },
    },
  }
);
export default ResearchAndDevelopment;
