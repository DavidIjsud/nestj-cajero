import { Product } from "./product";

export interface Owner{
    readonly name : string;
    readonly ciudad : string;
    readonly createdAt : Date;
    readonly  products : Product[]
}