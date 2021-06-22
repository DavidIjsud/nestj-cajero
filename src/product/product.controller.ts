import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param } from "@nestjs/common";
import { CreateProductDTO } from "./dto/product";
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController {


    constructor(private  productService : ProductService ) {
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
