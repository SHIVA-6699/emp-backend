import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";
import { TCRMAttributes } from "./crm.interface";

class CRM extends Model<TCRMAttributes> implements TCRMAttributes {
  public id!: string;
  public userId!: string;
}

CRM.init(
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
  { timestamps: true, sequelize: sequelizeConnection, modelName: "CRM" }
);

User.hasOne(CRM, { as: "crmProfile", foreignKey: "userId" });

CRM.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

export default CRM;
