import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { TWebinarInput, TWebinarOutput } from "./webinar.interface";
import Webinar from "./webinar.model";

const create = async (payload: TWebinarInput): Promise<TWebinarOutput> => {
  try {
    const result = await Webinar.create(payload);
    return result.dataValues;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating Webinar"
    );
  }
};

const getAll = async (): Promise<TWebinarOutput[] | []> => {
  try {
    const result = await Webinar.findAll();
    if (result.length === 0) {
      return [];
    }
    return result;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while getting Webinars"
    );
  }
};

const getAWebinarById = async (
  payload: string
): Promise<TWebinarOutput | string> => {
  try {
    const result = await Webinar.findOne({ where: { slug: payload } });
    if (result === null) {
      return "No Webinar Found";
    }
    return result;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while getting the webinar"
    );
  }
};

const deleteWebinar = async (payload: string) => {
  try {
    const result = await Webinar.destroy({ where: { id: payload } });
    return result;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while deleting the Webinar"
    );
  }
};

export const WebinarService = {
  create,
  getAWebinarById,
  deleteWebinar,
  getAll,
};
