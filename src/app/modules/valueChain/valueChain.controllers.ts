import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import ValueChainServices from "./valueChain.services";
import pick from "../../utils/pick";
import { Options } from "../../utils/calculatePagination";
import { ValueChainFilterableFields } from "./valueChain.constants";
import { TValueChainFilters } from "./valueChain.interfaces";

// get all value chains
const getAllValueChain = catchAsync(async (req, res) => {
  const options = pick(req.query, Options);
  const filters = pick(req.query, ValueChainFilterableFields);
  const result = await ValueChainServices.getAllValueChain(
    options,
    filters as TValueChainFilters
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Retrieved all value chains",
    data: result,
  });
});

const ValueChainControllers = {
  getAllValueChain,
};

export default ValueChainControllers;
