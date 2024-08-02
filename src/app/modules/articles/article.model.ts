import { TArticleAttributes, TArticleInput } from './article.interface';
import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../utils/sequelizeConnection";

class Article
  extends Model<TArticleAttributes, TArticleInput>
  implements TArticleAttributes
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
  public enableComment!: boolean;
}

Article.init(
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
      allowNull: false,
    },
    authorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    enableComment: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Article",
    timestamps: true,
    hooks: {
      beforeCreate: lesson => {
        lesson.slug = lesson.title.replace(/\s+/g, "-").toLowerCase();
      },
    },
  }
);

export default Article;
