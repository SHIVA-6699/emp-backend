import { DataTypes, Model } from "sequelize";
import { TPollAnswerAttribute, TPollAnswerInput } from "./pollAnswer.interface";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import Poll from "../polls/poll.model";
import User from "../user/user.model";

class PollAnswer
  extends Model<TPollAnswerAttribute, TPollAnswerInput>
  implements TPollAnswerAttribute
{
  public id!: string;
  public pollId!: string;
  public choice!: string;
  public userId!: string;
}

PollAnswer.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    pollId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Poll,
        key: "id",
      },
    },
    choice: {
      type: DataTypes.ENUM("yes", "no", "maybe"),
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
  { timestamps: true, sequelize: sequelizeConnection, modelName: "PollAnswer" }
);

Poll.hasMany(PollAnswer, { foreignKey: "pollId" });
PollAnswer.belongsTo(Poll, { foreignKey: "pollId" });

export default PollAnswer;
