import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";
import { TSRMAttributes } from "./srm.interface";

class SRM extends Model<TSRMAttributes> implements TSRMAttributes {
  public id!: string;
  public userId!: string;
}

SRM.init(
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
  { timestamps: true, sequelize: sequelizeConnection, modelName: "SRM" }
);

User.hasOne(SRM, { as: "SRMProfile", foreignKey: "userId" });

SRM.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

export default SRM;
