import Article from "../articles/article.model";
import Lesson from "../lesson/lesson.model";
import Poll from "../polls/poll.model";
import Quiz from "../quiz/quiz.model";

// get all data count
const getAllDataCount = async (category: string) => {
  // total lessons
  const lessons = await Lesson.count({
    where: {
      category: category,
    },
  });
  const quizzes = await Quiz.count({
    where: {
      category: category,
    },
  });
  const articles = await Article.count({
    where: {
      category: category,
    },
  });
  const polls = await Poll.count();

  const totalCounts = { lessons, quizzes, articles, polls };
  return { totalCounts };
};

const StatisticsServices = { getAllDataCount };
export default StatisticsServices;
