import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import Portfolio from "../portfolio/portfolio.model";

class Lead extends Model {
  public id!: string;
  public organizationName!: string;
  public designation!: string;
  public name!: string;
  public email!: string;
  public contactNo!: string;
  public location!: string;
  public remainingDays!: string;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Lead.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    organizationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    remainingDays: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    portfolioId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Portfolio,
        key: "id",
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Lead",
    timestamps: true,
  }
);

Portfolio.hasMany(Lead, { foreignKey: "portfolioId", as: "leads" });
Lead.belongsTo(Portfolio, { foreignKey: "portfolioId", as: "portfolio" });

export default Lead;
