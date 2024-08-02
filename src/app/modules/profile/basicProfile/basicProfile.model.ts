// Import required modules
import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../../utils/sequelizeConnection";
import Address from "../../address/address.model";
import File from "../../file/file.model";
import User from "../../user/user.model";
import { TBasicProfileAttributes } from "./basicProfile.interface";

// Import the interface for BasicProfile attributes

// Define the BasicProfile model
class BasicProfile
  extends Model<TBasicProfileAttributes>
  implements TBasicProfileAttributes
{
  public id?: string;
  public userId!: string;
  public first_name!: string;
  public last_name!: string;
  public phone_number?: string;
  public phone_verified?: boolean;
  public profile_image_id?: string;
  public current_address_id?: string;
  public permanent_address_id?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the BasicProfile model
BasicProfile.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_image_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: File,
        key: "id",
      },
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    phone_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    current_address_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Address,
        key: "id",
      },
    },
    permanent_address_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: Address,
        key: "id",
      },
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "BasicProfile",
    timestamps: true,
  }
);

BasicProfile.belongsTo(Address, {
  as: "current_address",
  foreignKey: "current_address_id",
});
BasicProfile.belongsTo(Address, {
  as: "permanent_address",
  foreignKey: "permanent_address_id",
});
BasicProfile.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});

BasicProfile.belongsTo(File, {
  foreignKey: "profile_image_id",
  as: "profile_image",
});

User.hasOne(BasicProfile, {
  as: "basicProfile",
  foreignKey: "userId",
});

// Export the BasicProfile model
export default BasicProfile;
