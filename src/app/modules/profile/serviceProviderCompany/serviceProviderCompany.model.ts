import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";
import { TServiceProviderCompanyAttributes } from "./serviceProviderCompany.interface";

class ServiceProviderCompany
  extends Model<TServiceProviderCompanyAttributes>
  implements TServiceProviderCompanyAttributes
{
  public id!: string;
  public userId!: string;
}

ServiceProviderCompany.init(
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
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "ServiceProviderCompany",
  }
);

User.hasOne(ServiceProviderCompany, {
  as: "ServiceProviderCompanyProfile",
  foreignKey: "userId",
});

ServiceProviderCompany.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

export default ServiceProviderCompany;
