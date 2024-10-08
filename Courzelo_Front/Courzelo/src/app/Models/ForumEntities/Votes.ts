import { UserCourzelo } from "../UserCorzelo/UserCourzelo";
import { Answer } from "./Answer";

export class Vote{
    id!:string;
    voteType!:number;
    teacher!:UserCourzelo
    date!:Date ;
    answer!:Answer;
   

}

