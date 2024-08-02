import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";
import { TBOAAttributes } from "./boa.interface";

class BOA extends Model<TBOAAttributes> implements TBOAAttributes {
  public id!: string;
  public userId!: string;
}

BOA.init(
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
  { timestamps: true, sequelize: sequelizeConnection, modelName: "BOA" }
);

User.hasOne(BOA, { as: "BOAProfile", foreignKey: "userId" });

BOA.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

export default BOA;
