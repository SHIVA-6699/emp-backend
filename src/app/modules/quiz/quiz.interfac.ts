export type TQuestionType = "multiple-choice";
export type TRedoQuiz = "yes" | "no";

export type TQuiz = {
  id?: string;
  category: string;
  lesson?: string;
  redoQuiz: TRedoQuiz;
  timer: number;
  question: string;
  options: string[];
  correctOption: string;
  questionType: TQuestionType;
};
