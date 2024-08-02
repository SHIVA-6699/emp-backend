import { DataTypes, Model } from "sequelize";
import { TPollAttribute, TPollInput } from "./poll.interface";
import { sequelizeConnection } from "../../utils/sequelizeConnection";

class Poll extends Model<TPollAttribute, TPollInput> implements TPollAttribute {
  public id!: string;
  public question!: string;
}

Poll.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: true, sequelize: sequelizeConnection, modelName: "Poll" }
);

export default Poll;
