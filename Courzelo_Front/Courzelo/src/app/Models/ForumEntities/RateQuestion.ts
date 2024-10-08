import { UserCourzelo } from "../UserCorzelo/UserCourzelo";
import { QuestionForum } from "./QuestionForum";


export class RateQuestion{
    id!:String;
    rateNumber!:number;
 
    questionForum!: Array<QuestionForum>;
    user!: Array<UserCourzelo>;
}