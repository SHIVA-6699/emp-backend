import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import StatisticsServices from "./statistics.services";

// get all data counts
const getAllDataCount = catchAsync(async (req, res) => {
  const result = await StatisticsServices.getAllDataCount(
    req.query.category as string
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "All count of data retrieved successfully.",
    data: result,
  });
});

const StatisticsController = { getAllDataCount };
export default StatisticsController;
