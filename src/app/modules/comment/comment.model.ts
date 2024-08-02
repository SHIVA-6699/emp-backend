import { DataTypes, Model } from "sequelize";
import { TCommentAttributes, TCommentInput } from "./comment.interface";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import User from "../user/user.model";

class Comment
  extends Model<TCommentAttributes, TCommentInput>
  implements TCommentAttributes
{
  public id!: string;
  public comment!: string;
  public contentId!: string;
  public userId!: string;
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contentId: {
      type: DataTypes.STRING,
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
  },
  { timestamps: true, sequelize: sequelizeConnection, modelName: "Comment" }
);

export default Comment;
