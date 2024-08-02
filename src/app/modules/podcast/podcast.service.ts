import { TPodcast } from "./podcast.interface";
import Podcast from "./podcast.model";

const createPodcast = async (payload: TPodcast) => {
  const result = await Podcast.create(payload);
  return result;
};

const getAllPodcasts = async () => {
  const result = Podcast.findAll();
  return result;
};

const PodcastService = {
  createPodcast,
  getAllPodcasts,
};
export default PodcastService;
