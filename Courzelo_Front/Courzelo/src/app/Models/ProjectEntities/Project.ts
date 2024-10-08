import { Speciality } from "../UserCorzelo/UserCourzelo";
import { Tasks } from "./Tasks";

export class Project {
    id!: number;
    name!: string;
    description!: string;
    difficulty!: Difficulty;
    datedebut!: Date;
    deadline!: Date;
    number!: number;
    hasGroupProject!: boolean;
    tasks!:Array<Tasks>;


    // Define the specialities array within the class
    specialities: Speciality[] = [
        Speciality.BD,
        Speciality.Angular,
        Speciality.Spring,
        Speciality.DotNet,
        Speciality.Reseau,
        Speciality.IA,
        Speciality.Mobile,
        Speciality.Web,
        Speciality.Cloud,
        Speciality.DevOps,
        Speciality.Security,
        Speciality.Design,
        Speciality.Management,
        Speciality.Marketing,
        Speciality.Finance
    ];
}

export enum Difficulty {
    Hard, Easy, Medium
}
