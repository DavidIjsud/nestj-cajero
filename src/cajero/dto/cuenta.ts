import { CreateRetiroDTO } from "./retiro";

export class CreateCuentasDTO{

       readonly nroCuenta: number;
        saldo : number ;
       readonly retiros : CreateRetiroDTO[];
       readonly createdAt: Date;
}