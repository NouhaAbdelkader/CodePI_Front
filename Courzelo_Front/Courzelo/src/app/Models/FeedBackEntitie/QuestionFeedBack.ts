export class QuestionFeedBack {
  id!: number;
  description!: string;
  option!: TypeOption;
}
export enum TypeOption {
  "Not Satisfactory",
  "Unsatisfactory",
  "Satisfactory",
  "Very Satisfying",
}
