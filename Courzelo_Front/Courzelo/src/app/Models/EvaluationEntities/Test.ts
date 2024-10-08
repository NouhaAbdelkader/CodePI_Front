import { UserCourzelo } from "../UserCorzelo/UserCourzelo";
import { QuestionTest } from "./QuestionTest";


export class Test {
  id!: string;
  name!: string;
  description!: string;
  grade!: number;
  rank!: number;
  date!: Date;
  duration!: number;
  questions!: Array<QuestionTest>;
  type!: TestType;
  teacher!: UserCourzelo;
}
export enum TestType {
  QuizTest = "QuizTest",
  FinalTest = "FinalTest",
  RevisionTest = "RevisionTest",
}
