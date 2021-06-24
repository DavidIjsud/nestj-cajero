import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param } from "@nestjs/common";

import { CajeroService } from "./cajero.service";
import { CreateClientDTO } from "./dto/cliente";
import { ClienteParametrosVerificacion, RetiroParametros } from "./dto_body/dtos_body";
import { Response } from "express";

@Controller('cliente')
export class CajeroController {


    constructor(private  cajeroService : CajeroService ) {
    }


    @Get('obtenerCuentas')
    async obtenerCuentas( @Res() res : Response , @Body() credenciales : ClienteParametrosVerificacion){
          if( !credenciales.ci ){
            return  res.status(HttpStatus.BAD_REQUEST)
              .json({
                "status" : false,
                "message" : "Debe mandar el ci"
              });
          }

       const cuentas = await this.cajeroService.obtenerCuentas( credenciales.ci );

          return res.status(HttpStatus.OK)
            .json({
                  "status" : true,
                  "message" : "Datos encontrados" ,
                  "data" : cuentas
            });

    }


    @Get('verificar')
    async verificarCliente( @Res() res , @Body() verificarBody : ClienteParametrosVerificacion  ){
          if( !verificarBody.ci ){
              return  res.status(HttpStatus.BAD_REQUEST)
                  .json({
                        "status" : false,
                        "message" : "Debe mandar el ci"
                  });
          }

       const resultado =  await this.cajeroService.verificarCliente(verificarBody.ci);
       if(!resultado){
        return res.status(HttpStatus.BAD_REQUEST)
           .json({
             "status" : false,
             "message" : "Cliente no encontrado"
           });
       } else{
        return res.status(HttpStatus.BAD_REQUEST)
           .json({
             "status" : true,
             "message" : "Cliente encontrado"
           });
       }
    }

     @Post('createCliente')
    async createOwner( @Res() res , @Body() ownerBody : CreateClientDTO ){

           console.log(ownerBody);
          const clienteCreated =  await  this.cajeroService.createCliente(ownerBody);
          return res.status(HttpStatus.OK)
            .json({
                  "status" : true,
                  clienteCreated
            });
     }

  @Get('retiro')
  async nuevoRetiro( @Res() res , @Body() parametros : RetiroParametros   ){

      if( !parametros.cantidadRetirar || !parametros.nroCuenta  || !parametros.ci ){
        return res.status(HttpStatus.BAD_REQUEST)
          .json({
            "status" : false,
            "message" : "Enviar los parametros requeridos"
          });
      }

    const clients : CreateClientDTO[] | boolean | string =  await  this.cajeroService.retiro(parametros.ci,parametros.nroCuenta,parametros.cantidadRetirar);

    console.log("Lo q ess clients" + clients);

          if( (typeof clients) == "string" ){
            return res.status(HttpStatus.OK)
              .json({
                "status" : false,
                "message" : clients
              });
          }

          if( (typeof clients) == "boolean"  ){
            if( !clients ){
              return res.status(HttpStatus.OK)
                .json({
                  "status" : false,
                  "message" : "No se encontro una cuenta"
                });
            }
          }

      return res.status(HttpStatus.OK)
      .json({
        "status" : true,
        clients
      });
  }



}
