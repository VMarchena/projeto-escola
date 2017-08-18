import { Nota } from "../nota/nota.interface";

export interface Student {
    $key?: string;
    nome: string;
    matricula: string;
    cpf: string;
    bairro: string;
    notas: Nota[]; 

}