import { TQAndA } from "./qAndA.interface";
import QAndA from "./qAndA.model";

const createQAndA = async (payload: TQAndA) => {
  const result = await QAndA.create(payload);
  return result;
};

const getAllQAndA = async () => {
  const result = QAndA.findAll();
  return result;
};

const QAndAService = {
  createQAndA,
  getAllQAndA,
};
export default QAndAService;
