import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Document, Model } from "mongoose";
import { async } from "rxjs";
import * as mongoose from "mongoose";
import { Cuenta } from "./interfaces/cuenta";
import { Cliente } from "./interfaces/cliente";
import { CreateClientDTO } from "./dto/cliente";
import { CreateCuentasDTO } from "./dto/cuenta";
import { Retiro } from "./interfaces/retiro";
import { CreateRetiroDTO } from "./dto/retiro";
@Injectable()
export class CajeroService {

    constructor( @InjectModel('Cuenta') private cuentaModel : Model<CreateCuentasDTO> ,
                 @InjectModel('Cliente')  private clienteModel : Model<CreateClientDTO>,
                 @InjectModel('Retiro') private retiroModel : Model<CreateRetiroDTO>
                 ) {}


  async createCliente( ownerToCreate : CreateClientDTO ) : Promise<CreateClientDTO>{
        const ownerCreated = new this.clienteModel(ownerToCreate);
       console.log("El objeto a insertar" + ownerToCreate);
      await ownerCreated.save();
      return ownerCreated;
  }

   async obtenerCuentas( ci : number ) : Promise<CreateCuentasDTO[]>{

      const cliente  =  await this.clienteModel.find( { "ci" : ci } );

       if( cliente.length > 0 ){
          const  clienteToReturn : CreateClientDTO = cliente[0];
          return clienteToReturn.cuentas;
       } else{
          return [];
       }

   }

   async verificarCliente( ci :  number ) : Promise<boolean> {

     const cliente =  await this.clienteModel.find({ "ci" : ci });
     return cliente.length > 0;
  }



  async retiro( ci :  number , nroCuenta : number , cantidadRetirar : number ) :  Promise<CreateClientDTO[] | boolean | string> {
    let  verificacion = false ;
    let verificacionSaldo = "";
    const x = await this.clienteModel.find( { "ci" : ci } , { "_id" : 0 , "__v" : 0 } ) ;

    if( x.length == 0 ){
        return verificacion = false;
    }

    const cliente : CreateClientDTO  = x[0];
    console.log(cliente);
    cliente.cuentas.forEach( ( cuenta , indice ) => {

            if( cuenta.nroCuenta == nroCuenta ){
                  if( cuenta.saldo > cantidadRetirar ){
                    cuenta.saldo = cuenta.saldo - cantidadRetirar;
                    const  nuevoRetiro : CreateRetiroDTO = new CreateRetiroDTO();
                    nuevoRetiro.cantidad = cantidadRetirar;
                    cuenta.retiros.push(nuevoRetiro);
                  } else {
                    verificacionSaldo = "Saldo insuficiente";
                  }
                verificacion = true;
            }
    } )

    if( verificacionSaldo == "Saldo insuficiente" ){
          return verificacionSaldo;
    }

    if(  !verificacion ){
        return verificacion;
    }

    await this.clienteModel.findOneAndUpdate({ "ci" : ci }, cliente);
    console.log("Cliente actualizado "+ cliente);

    return x;

  }

}
