import { Class } from "../AcademicProgramEntities/Class";
import { Module } from "../AcademicProgramEntities/Module";
import { UserCourzelo } from "../UserCorzelo/UserCourzelo";


export class Session{
    id:number | undefined;
    date:string;
    startTime!: any;
    endTime!: any;
    Participants!:Array<UserCourzelo>;
    conferanceLink!:string ;
    type!:TypeSession;
    day!:number;
    temp!:number;
    teacher:UserCourzelo |undefined;
    aclass:Class|undefined;
    module!:Module;
}
export enum TypeSession {
    Exam,
    Course
}