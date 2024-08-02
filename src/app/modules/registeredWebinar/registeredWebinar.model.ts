import { DataTypes, Model } from "sequelize";
import {
  TRegisteredWebinarAttributes,
  TRegisteredWebinarInput,
} from "./registeredWebinar.interface";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import User from "../user/user.model";
import Webinar from "../webinar/webinar.model";

class RegisteredWebinar
  extends Model<TRegisteredWebinarAttributes, TRegisteredWebinarInput>
  implements TRegisteredWebinarAttributes
{
  public id!: string;
  public email!: string;
  public firstName!: string;
  public lastName!: string;
  public companyName!: string;
  public webinarId!: string;
  public userId!: string;
}

RegisteredWebinar.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName: {
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
    webinarId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Webinar,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "RegisteredWebinar",
  }
);

export default RegisteredWebinar;
