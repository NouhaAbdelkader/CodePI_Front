import { Test } from "./Test";



export class ModuleEvaluation{
    id!:number;
    name!:string;
    description!:string;
    quizGrade!:number;
    finalTestGrade!:number;
    ModuleAverage!:number;
    rankModule!:number;
    rankClass!:number;
    rank!:number;
    honors!:string;
    type!:EvaluationType;

    Tests!:Array<Test>
    
}
export enum EvaluationType{
    Final,
    Module
}