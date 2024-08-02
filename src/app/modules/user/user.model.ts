import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import { TRoleType } from "./user.constant";
import { TUserAttributes } from "./user.interface";

class User extends Model<TUserAttributes> implements TUserAttributes {
  public id?: string;
  public email!: string;
  public password!: string;
  public roles!: TRoleType[];
  public current_role!: TRoleType;
  public email_verified!: boolean;
  public isDeleted!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roles: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: ["USER"],
    },
    current_role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "USER",
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "User",
    timestamps: true,
  }
);

export default User;
