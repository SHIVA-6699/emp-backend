import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";
import { TInvestorAttributes } from "./investor.interface";

class Investor
  extends Model<TInvestorAttributes>
  implements TInvestorAttributes
{
  public id!: string;
  public userId!: string;
}

Investor.init(
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
  { timestamps: true, sequelize: sequelizeConnection, modelName: "Investor" }
);

User.hasOne(Investor, { as: "investorProfile", foreignKey: "userId" });

Investor.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

export default Investor;
