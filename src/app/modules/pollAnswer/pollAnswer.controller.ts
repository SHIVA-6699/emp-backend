import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import { PollAnswerService } from "./pollAnswer.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";

const addAnswerToPoll = catchAsync(async (req: Request, res: Response) => {
  let addAnswer;
  try {
    const { pollId, choice } = req.body;
    const userId = req?.user.id;
    if (!userId) {
      throw new AppError(StatusCodes.NOT_FOUND, "User Id Not Found");
    }
    if (!pollId || !choice) {
      throw new AppError(StatusCodes.NOT_FOUND, "Poll Id or Choice not found");
    }
    addAnswer = await PollAnswerService.create({ pollId, choice, userId });
    const statistics = await PollAnswerService.getPollStatistics(pollId);
    sendResponse(res, {
      data: {
        chosenAnswer: addAnswer.choice,
        statistics,
      },
      message: "Successfully added answer to poll",
      success: true,
      statusCode: StatusCodes.CREATED,
    });
  } catch (error) {
    // Handle error\
    if (addAnswer) {
      await PollAnswerService.deletePollAnswer(addAnswer.id);
    }
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong while adding answer to poll"
    );
  }
});

export const PollAnswerController = {
  addAnswerToPoll,
};
