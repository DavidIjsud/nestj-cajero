import { CreateProductDTO } from "./product";

export class CreateOwnerDT{
      readonly name : string;
      readonly ciudad : string;
      readonly createdAt : Date;
      readonly  products : CreateProductDTO[];
}