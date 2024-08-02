import { Sequelize } from "sequelize";
import config from "../config";

export const sequelizeConnection = new Sequelize(
  config.db_url as string ,

  {
    logging: false,
  }
);
