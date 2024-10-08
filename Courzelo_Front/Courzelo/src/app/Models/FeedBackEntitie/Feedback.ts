import { Module } from "../AcademicProgramEntities/Module";
import { UserCourzelo } from "../UserCorzelo/UserCourzelo";
import { QuestionFeedBack } from "./QuestionFeedBack";

export class Feedback {
  id!: number;
  description!: string;
  typeFeedback!: TypeFeedback;
  CourseContent!: number;
  student!: UserCourzelo;
  teacher!: UserCourzelo;
  module!: Module;
  questionFeedback!: QuestionFeedBack;
}
export enum TypeFeedback {
  "Module",
  "Teacher",
}
