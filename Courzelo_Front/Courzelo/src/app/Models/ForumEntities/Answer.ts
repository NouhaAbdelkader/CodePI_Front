import { UserCourzelo } from "../UserCorzelo/UserCourzelo";
import { QuestionForum } from "./QuestionForum";
import { Vote } from "./Votes";

export class Answer{
    id!:string;
    message!:string;
    nbrVote!:number;
    getBudget!:Boolean;
    date!:Date;
    user!:UserCourzelo;
    question!:QuestionForum;
    votes:Vote[]=[] ;
 
    
}