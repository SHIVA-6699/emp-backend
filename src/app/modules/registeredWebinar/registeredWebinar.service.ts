import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import {
  TRegisteredWebinarInput,
  TRegisteredWebinarOutput,
} from "./registeredWebinar.interface";
import RegisteredWebinar from "./registeredWebinar.model";

const create = async (
  payload: TRegisteredWebinarInput
): Promise<TRegisteredWebinarOutput> => {
  const isExits = await RegisteredWebinar.findOne({
    where: {
      userId: payload.userId,
      email: payload.email,
    },
  });
  if (isExits) {
    throw new AppError(
      StatusCodes.CONFLICT,
      "Already Registered For The Webinar"
    );
  }
  const result = await RegisteredWebinar.create(payload);
  return result;
};

export const RegisteredWebinarService = {
  create,
};
