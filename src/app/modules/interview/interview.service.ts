import { TInterviewInput, TInterviewOutput } from "./interview.interface";
import Interview from "./interview.model";

const create = async (payload: TInterviewInput): Promise<TInterviewOutput> => {
  const existedInterview = await Interview.findOne({
    where: { interviewId: payload.interviewId },
  });
  if (existedInterview) {
    await existedInterview.update(payload);
    return existedInterview.dataValues;
  }
  const result = await Interview.create(payload);
  return result.dataValues;
};

const getAll = async (): Promise<TInterviewOutput[]> => {
  const result = await Interview.findAll();
  return result;
};

const getDetails = async (
  payload: string
): Promise<TInterviewOutput | null> => {
  const result = await Interview.findOne({ where: { id: payload } });
  return result;
};
export const InterviewService = {
  create,
  getAll,
  getDetails,
};
