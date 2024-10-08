
import { Test } from "../EvaluationEntities/Test";
import { QuestionForum } from "../ForumEntities/QuestionForum";
import { Class } from "./Class";
import { EducationalProgram } from "./EducationalProgram";
import { Semestre } from "./Semestre";

export class Module{
    id!:string;
    name!:string;
    description!:string;
    nbHeurePerWeek!:number;
    nbHeureTotal!:number;
    Image!:string;
    coeff!:number ;
    
    
    program:EducationalProgram|undefined;

    questionForums:QuestionForum[]=[]
    tests: Test[]=[]
    //couef!:number ;
    
    semestre:Semestre | undefined;
    
    classes: Class[] = [];
    
    
}