import { Session } from "../SessionEntities/Session";
import { UserCourzelo } from "../UserCorzelo/UserCourzelo";
import { Level } from "./Level";

export class Class{
    id:number |undefined;
    name!:string;
    level!: Level | undefined; 
    Schedule?:Array<Session> | undefined;
    Students?:Array<UserCourzelo> |undefined;
    
}