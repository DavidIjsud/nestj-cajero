import { Cuenta } from "./cuenta";


export interface Cliente{
    readonly nombreCliente : string;
    readonly ci : number;
    readonly direccion : string;
    readonly  cuentas : Cuenta[];
    readonly createdAt : Date;
}