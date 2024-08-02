import { Optional } from "sequelize";
export interface TPollAnswerAttribute {
  id: string;
  pollId: string;
  choice: string;
  userId: string;
}

export interface TPollAnswerInput
  extends Optional<TPollAnswerAttribute, "id"> {}
export interface TPollAnswerOutput extends Required<TPollAnswerAttribute> {}
export interface TPollAnswerStatisticsOutput {
  yesCount: number;
  noCount: number;
  maybeCount: number;
  totalParticipants: number;
}
