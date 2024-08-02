export type TSubmittedQuiz = {
  id: string;
  question: string;
  options: string[];
  correctOption: string;
  selectedAns: string;
};

export type TQuizTestResult = {
  id?: string;
  userId: string;
  totalMark: number;
  achievedMark: number;
  lesson: string;
  quizzes: TSubmittedQuiz[];
};
