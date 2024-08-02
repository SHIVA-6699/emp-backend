import sequelize from "sequelize";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";
import { StatusCodes } from "http-status-codes";

const handleSequelizeDatabaseError = (
  error: sequelize.Error
): TGenericErrorResponse => {
  const message = "Invalid uuid.";
  const statusCode = StatusCodes.BAD_REQUEST;

  const id = error?.message?.match(/"(.*?)"/)?.[1];
  const errorSources: TErrorSource[] = [
    {
      message: `'${id}' is not a valid id.`,
      path: "id",
    },
  ];

  return {
    message,
    statusCode,
    errorSources,
  };
};

export default handleSequelizeDatabaseError;
