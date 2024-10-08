import { Module } from "../AcademicProgramEntities/Module";
import { UserCourzelo } from "../UserCorzelo/UserCourzelo";
import { Test } from "./Test";



export class Evaluation{
    id!:number;
    name!:string;
    description!:string;
    quizGrade!:number;
    finaltest_grade!:number;
    moduleAverage!:number;
    rankModule!:number;
    rankClass!:number;
    rank!:number;
    honors!:string;
    evaluationType!:evaluationType;
    Tests!:Array<Test>
    module!:Module;
    student!: UserCourzelo;
    finalAverage!: number;
    comments!:string;
}
export enum evaluationType{
    Final,
    Module
}