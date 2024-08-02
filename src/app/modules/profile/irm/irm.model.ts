import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";
import { TIRMAttributes } from "./irm.interface";

class IRM extends Model<TIRMAttributes> implements TIRMAttributes {
  public id!: string;
  public userId!: string;
}

IRM.init(
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
  { timestamps: true, sequelize: sequelizeConnection, modelName: "IRM" }
);

User.hasOne(IRM, { as: "IRMProfile", foreignKey: "userId" });

IRM.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

export default IRM;
