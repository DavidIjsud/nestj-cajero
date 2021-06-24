import { Schema } from "mongoose";
import * as mongoose from "mongoose";
import { ProductSchema } from "./product.schema";


export const OwnerSchema = new Schema(
  {
       name : { type : String , required : true },
       ciudad : String,
       createdAt : { type : Date , default : Date.now() },
       products : [
         {
            type :ProductSchema,
            ref : "Owner"
         }
       ] ,
  }
);