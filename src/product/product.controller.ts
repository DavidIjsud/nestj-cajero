import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param } from "@nestjs/common";
import { CreateProductDTO } from "./dto/product";
import { ProductService } from "./product.service";
import { CreateOwnerDT } from "./dto/owner";

@Controller('product')
export class ProductController {


    constructor(private  productService : ProductService ) {
    }

     @Post('createOwner')
    async createOwner( @Res() res , @Body() ownerBody : CreateOwnerDT ){

           console.log(ownerBody);
          const onwerCreated =  await  this.productService.createOwner(ownerBody);
          return res.status(HttpStatus.OK)
            .json({
                  "status" : true,
                  onwerCreated
            });
     }

      @Post('create')
     async createPost(@Res() res , @Body() createProductDTO : CreateProductDTO ){
         const productoCreado = await this.productService.createProduct( createProductDTO );
          res.status(HttpStatus.OK).json({
                  "message" : "received",
                  productoCreado
          });
      }

      @Get('all')
      async obtainAllProducts( @Res() res ){

        const products = await this.productService.getProducts();
        res.status(HttpStatus.OK)
          .json({
            "status" : true,
            products
          });

      }

      @Get('update/:id')
      async updateProduct( @Res() res , @Param('id') idProduct : string , @Body() createProductDTO : CreateProductDTO  ){
        console.log("Id del producto a actualizar" +idProduct);
        console.log("producto a actualizar "+createProductDTO);
          const productUpdated = await this.productService.updateProduct(idProduct , createProductDTO );
          res.status(HttpStatus.OK)
            .json({
                  "status" : true,
                  "message" : "Product updated",
                  "productUpdated" : productUpdated
            });

      }


}
