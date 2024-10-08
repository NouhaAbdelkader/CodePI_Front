import { Filecalss } from "./Filecalss";
import { Module } from "./Module";

export class Course{
    id!:number;
    name!:string;
    description!:string;
    module!:Module;
    file!:Filecalss;
}