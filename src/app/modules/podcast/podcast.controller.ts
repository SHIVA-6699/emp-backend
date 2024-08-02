import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import PodcastService from "./podcast.service";

const createPodcast = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await PodcastService.createPodcast(payload);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Podcast created successfully.",
    data: result,
  });
});

const getAllPodcasts = catchAsync(async (req, res) => {
  const result = await PodcastService.getAllPodcasts();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "All podcast retrieved successfully.",
    data: result,
  });
});

const PodcastController = {
  createPodcast,
  getAllPodcasts,
};

export default PodcastController;
