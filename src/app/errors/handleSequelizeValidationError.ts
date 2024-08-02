import { ValidationError } from 'sequelize';
import { TErrorSource, TGenericErrorResponse } from '../interface/error';
import config from '../config';
import { StatusCodes } from 'http-status-codes';

const handleSequelizeValidationError = (
  error: ValidationError,
): TGenericErrorResponse => {
  const message = `${config.NODE_ENV === 'development' && 'Sequelize'} validation error.`;
  const statusCode = StatusCodes.BAD_REQUEST;
  const errorSources: TErrorSource[] = error.errors.map(error => ({
    message: error.message,
    path: error.path || '',
  }));

  return {
    message,
    statusCode,
    errorSources,
  };
};

export default handleSequelizeValidationError;
