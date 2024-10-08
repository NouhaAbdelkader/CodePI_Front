import { Module } from "../AcademicProgramEntities/Module";
import { UserCourzelo } from "../UserCorzelo/UserCourzelo";


export class QuestionForum{

    id!:string;
    title!:string;
    description!:string;
    student!: UserCourzelo ;
    module!:Module ;
    date!:Date ;
    
    
}