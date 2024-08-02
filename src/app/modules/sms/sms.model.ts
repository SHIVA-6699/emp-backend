// backend/models/sms.model.ts
import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../utils/sequelizeConnection";
import { SmsVerificationAttributes } from "./sms.interface";
class SmsVerification
  extends Model<SmsVerificationAttributes>
  implements SmsVerificationAttributes
{
  public id!: string;
  public phoneNumber!: string;
  public otp!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SmsVerification.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "SmsVerification",
  }
);

export default SmsVerification;
