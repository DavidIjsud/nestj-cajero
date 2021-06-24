import { Schema } from "mongoose";
import { RetiroSchema } from "./retiro.schema";

export const CuentaSchema = new Schema({

        nroCuenta : { type : Number , required : true },
        saldo :{ type : Number , required : true } ,
        retiros : [{
                    type : RetiroSchema
        }],
        createdAt : { type : Date , default : Date.now()}
});