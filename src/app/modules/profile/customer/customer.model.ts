import { DataTypes, Model } from "sequelize";
import { TCustomerAttributes } from "./customer.interface";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import User from "../../user/user.model";

class Customer
  extends Model<TCustomerAttributes>
  implements TCustomerAttributes
{
  public id!: string;
  public userId!: string;
}

Customer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Customer",
    timestamps: true,
  }
);

// make association between customer and user
User.hasOne(Customer, {
  as: "customerProfile",
  foreignKey: "userId",
});

Customer.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

export default Customer;
