import { TWebcastInput, TWebcastOutput } from "./webcast.interface";
import Webcast from "./webcast.model";

const create = async (payload: TWebcastInput): Promise<TWebcastOutput> => {
  const result = await Webcast.create(payload);
  return result.dataValues;
};

const getAll = async (): Promise<TWebcastOutput[]> => {
  const result = await Webcast.findAll();
  return result;
};

const getAWebcast = async (payload: string) => {
  const result = await Webcast.findOne({ where: { slug: payload } });
  return result?.dataValues;
};
export const WebcastService = {
  create,
  getAWebcast,
  getAll,
};
