import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";
import { TTOAAttributes } from "./toa.interface";

class TOA extends Model<TTOAAttributes> implements TTOAAttributes {
  public id!: string;
  public userId!: string;
}

TOA.init(
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
  { timestamps: true, sequelize: sequelizeConnection, modelName: "TOA" }
);

User.hasOne(TOA, { as: "TOAProfile", foreignKey: "userId" });

TOA.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

export default TOA;
