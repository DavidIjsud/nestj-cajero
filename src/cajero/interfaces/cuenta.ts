import { Document } from 'mongoose';
import { Retiro } from "./retiro";

export interface Cuenta{
  readonly nroCuenta: number;
  readonly saldo : number ;
  readonly  retiros : Retiro[];
  readonly createdAt: Date;
}