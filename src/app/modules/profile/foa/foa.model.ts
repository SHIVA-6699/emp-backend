import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";
import { TFOAAttributes } from "./foa.interface";

class FOA extends Model<TFOAAttributes> implements TFOAAttributes {
  public id!: string;
  public userId!: string;
}

FOA.init(
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
  { timestamps: true, sequelize: sequelizeConnection, modelName: "FOA" }
);

User.hasOne(FOA, { as: "FOAProfile", foreignKey: "userId" });

FOA.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

export default FOA;
