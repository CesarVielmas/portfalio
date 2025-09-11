import { ProyectInformation } from "./proyectInformation.model";

export interface GitProyect {
    id:number,
    name:string,
    html_url:string,
    created_at:Date,
    pushed_at:Date,
    languages_used:Record<string,string>,
    technologys_used:Array<string>,
    state_proyect:number,
    proyect_information:Record<string,ProyectInformation>
}