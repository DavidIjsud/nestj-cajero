import { Module } from '@nestjs/common';
import { CajeroController } from './cajero.controller';
import { CajeroService } from './cajero.service';
import  { MongooseModule } from "@nestjs/mongoose";
import { CuentaSchema } from "./schemas/cuenta.schema";
import { ClienteSchema } from "./schemas/cliente.schema";
import { RetiroSchema } from "./schemas/retiro.schema";

@Module({
  imports : [
       MongooseModule.forFeature( [
         { name : "Cuenta" , schema : CuentaSchema },
         { name : "Cliente"  , schema : ClienteSchema},
         { name : "Retiro"  , schema : RetiroSchema  }
       ] )
  ],
  controllers: [CajeroController],
  providers: [CajeroService]
})
export class CajeroModule {}
