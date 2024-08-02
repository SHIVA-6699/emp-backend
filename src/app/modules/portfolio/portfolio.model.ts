import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import User from "../user/user.model";

class Portfolio extends Model {
  public id!: string;
  public name!: string;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Portfolio.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Portfolio",
    timestamps: true,
  }
);

// Define the relationships
User.hasMany(Portfolio, { foreignKey: "userId", as: "portfolios" });
Portfolio.belongsTo(User, { foreignKey: "userId", as: "user" });



export default Portfolio;
