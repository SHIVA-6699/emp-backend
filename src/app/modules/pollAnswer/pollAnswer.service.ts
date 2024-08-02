import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import {
  TPollAnswerInput,
  TPollAnswerOutput,
  TPollAnswerStatisticsOutput,
} from "./pollAnswer.interface";
import PollAnswer from "./pollAnswer.model";

const create = async (
  payload: TPollAnswerInput
): Promise<TPollAnswerOutput> => {
  try {
    const result = await PollAnswer.create(payload);
    return result.dataValues;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while creating Poll Answer"
    );
  }
};

const getPollStatistics = async (
  payload: string
): Promise<TPollAnswerStatisticsOutput> => {
  try {
    const totalParticipants = await PollAnswer.count({
      where: { pollId: payload },
    });
    const yesCount = await PollAnswer.count({
      where: { pollId: payload, choice: "yes" },
    });
    const noCount = await PollAnswer.count({
      where: { pollId: payload, choice: "no" },
    });
    const maybeCount = await PollAnswer.count({
      where: { pollId: payload, choice: "maybe" },
    });
    return { yesCount, noCount, maybeCount, totalParticipants };
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while getting statistics"
    );
  }
};

const deletePollAnswer = async (payload: string) => {
  try {
    const result = await PollAnswer.destroy({ where: { id: payload } });
    return result;
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while deleting answer"
    );
  }
};

export const PollAnswerService = {
  create,
  getPollStatistics,
  deletePollAnswer,
};
