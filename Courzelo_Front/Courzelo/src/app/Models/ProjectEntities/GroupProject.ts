import { UserCourzelo } from "../UserCorzelo/UserCourzelo";
import { Project } from "./Project";


export class GroupProject{
    id!:number;
    name!:string;
    Students!:Array<UserCourzelo>;
    project!:Project;
    number!: number;
}