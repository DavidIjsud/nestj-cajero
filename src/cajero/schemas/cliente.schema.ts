import { Schema } from "mongoose";
import * as mongoose from "mongoose";
import { CuentaSchema } from "./cuenta.schema";


export const ClienteSchema = new Schema(
  {
    nombreCliente : { type : String , required : true },
    ci : { type : Number , required : true },
    direccion :  { type : String , required : true } ,
    cuentas : [
        {
            type : CuentaSchema
        }
       ] ,
    createdAt : { type : Date , default : Date.now() }
  }
);