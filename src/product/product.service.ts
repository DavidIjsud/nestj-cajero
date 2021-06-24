import { Injectable } from '@nestjs/common';
import { Product } from "./interfaces/product";
import { CreateProductDTO } from "./dto/product";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Owner } from "./interfaces/owner";
import { CreateOwnerDT } from "./dto/owner";
import { async } from "rxjs";
import * as mongoose from "mongoose";
@Injectable()
export class ProductService {

    constructor( @InjectModel('Product') private productModel : Model<Product> ,
                 @InjectModel('Owner')  private ownerModel : Model<Owner>  ) {}


  async createOwner( ownerToCreate : CreateOwnerDT ) : Promise<Owner>{
        const ownerCreated = new this.ownerModel(ownerToCreate);
       console.log("El objeto a insertar" + ownerToCreate);
      await ownerCreated.save();
        /*ownerToCreate.products.forEach( ( product : CreateProductDTO ) =>  {
              const productNuevo = new this.productModel(product);
               productNuevo.save()
                 .then( (value) => {

                 } )

        }); */

        return ownerCreated;
  }

   async getProducts() : Promise<Product[]> {
        const products = await this.productModel.find({}, { "__v" : 0 , "_id" : 0 });
        return products;
    }

   async getProduct( productID : string ) : Promise<Product> {
          const product =   await this.productModel.findById(productID);
          return product;
    }

    async createProduct( createProductDTO : CreateProductDTO ) : Promise<Product> {
       const product =  new this.productModel(createProductDTO);
       await product.save();
       return product;
    }
   async deleteProduct( productID : string ) : Promise<Product> {
        const product =   await this.productModel.findByIdAndDelete(productID);
        return  product;
    }

    async updateProduct( productID: string , createProductDTO : CreateProductDTO  ) : Promise<Product>{
      const productUpdated = await this.productModel.findByIdAndUpdate( productID , createProductDTO , { new : true} );
      console.log(productUpdated);
      return productUpdated;
    }
}
