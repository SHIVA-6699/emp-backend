import { DataTypes, Model } from "sequelize";
import { TRatingAttributes, TRatingInput } from "./rating.interface";
import { sequelizeConnection } from "../../utils/sequelizeConnection";

class Rating
  extends Model<TRatingAttributes, TRatingInput>
  implements TRatingAttributes
{
  public id!: string;
  public contentId!: string;
  public userId!: string;
  public rating!: number;
}

Rating.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    contentId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { timestamps: true, sequelize: sequelizeConnection, modelName: "Rating" }
);

export default Rating;
