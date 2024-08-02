import { TRatingInput } from "./rating.interface";
import Rating from "./rating.model";

const addRating = async (payload: TRatingInput) => {
  const existingRating = await Rating.findOne({
    where: { userId: payload.userId, contentId: payload.contentId },
  });
  if (existingRating) {
    existingRating.rating = payload.rating;
    await existingRating.save();
    return existingRating;
  } else {
    const result = await Rating.create(payload);
    return result.dataValues;
  }
};

const contentRatingCount = async (payload: string) => {
  const { count } = await Rating.findAndCountAll({
    where: { contentId: payload },
  });
  return count;
};

const averageRatingOfContent = async (payload: string) => {
  const ratings = await Rating.findAll({
    where: { contentId: payload },
    attributes: ["contentId"],
  });
  if (ratings.length === 0) {
    return 0;
  }
  const totalRatings = ratings.reduce((sum, rating) => sum + rating.rating, 0);
  const average = totalRatings / ratings.length;
  return average;
};

export const RatingService = {
  addRating,
  contentRatingCount,
  averageRatingOfContent,
};
