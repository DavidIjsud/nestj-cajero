import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CajeroModule } from './cajero/cajero.module';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [CajeroModule , MongooseModule.forRoot('mongodb://localhost/topico_v3')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
