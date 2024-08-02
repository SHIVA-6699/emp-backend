import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import config from "../config";
import AppError from "../errors/AppError";
import handleAppError from "../errors/handleAppError";
import { ValidationError } from "sequelize";
import handleSequelizeValidationError from "../errors/handleSequelizeValidationError";
import handleSequelizeDatabaseError from "../errors/handleSequelizeDatabaseError";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // console.log(error.message);

  /* 
    1. handle zod error
    2. handle sequelize validation error
    3. handle SequelizeDatabaseError error
    5. handle error that instance of AppError
    */
  const success = false;
  let statusCode = 500;
  let message = error.message || "Internal server error.";

  let errorSources = null;

  // handle zod error
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  // handle sequelize validation error
  if (error instanceof ValidationError) {
    const simplifiedError = handleSequelizeValidationError(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  }

  // handle SequelizeDatabaseError error

  if (error.name === "SequelizeDatabaseError") {
    const simplifiedError = handleSequelizeDatabaseError(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  }

  //handle instance of app error
  if (error instanceof AppError) {
    const simplifiedError = handleAppError(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  }
  // send response
  res.status(statusCode).json({
    success,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? error?.stack : null,
  });
};

export default globalErrorHandler;
