import { Answer } from "../ForumEntities/Answer";
import { QAnswer } from "./QAnswer";

export class QuestionTest{
    id!:string;
    name!:string;
    description!:string;
    answers!:Array<QAnswer> ;
    correctAnswer!: string;
}