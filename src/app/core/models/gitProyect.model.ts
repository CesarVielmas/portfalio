import { ProyectInformation } from "./proyectInformation.model";

export interface GitProyect {
    id:number,
    name:string,
    description:string,
    html_url:string,
    created_at:Date,
    pushed_at:Date,
    languages_used:Record<string,string>,
    proyect_information:ProyectInformation
}