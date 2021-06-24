import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import  { MongooseModule } from "@nestjs/mongoose";
import { ProductSchema } from "./schemas/product.schema";
import { OwnerSchema } from "./schemas/owner.schema";

@Module({
  imports : [
       MongooseModule.forFeature( [
         { name : "Product" , schema : ProductSchema },
         { name : "Owner"  , schema : OwnerSchema}
       ] )
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
