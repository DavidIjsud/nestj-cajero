import { CreateCuentasDTO } from "./cuenta";


export class CreateClientDTO{
      readonly nombreCliente : string;
      readonly ci : number;
      readonly direccion : string;
      readonly  cuentas : CreateCuentasDTO[];
      readonly createdAt : Date;
}