import { Schema } from "mongoose";


export const RetiroSchema = new Schema(
  {
        cantidad : { type : Number , required: true },
        createdAt : { type : Date , default : Date.now() }
  }
);