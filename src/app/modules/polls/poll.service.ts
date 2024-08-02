import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import Poll from "./poll.model";
import { TPollOutPut } from "./poll.interface";

const create = async (payload: string): Promise<TPollOutPut> => {
  try {
    const response = await Poll.create({
      question: payload,
    });
    return response.dataValues;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating poll"
    );
  }
};

const getAll = async (): Promise<TPollOutPut[]> => {
  try {
    const response = await Poll.findAll();
    return response;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while getting polls"
    );
  }
};

export const PollService = {
  create,
  getAll,
};
