import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Partido, PartidoSchema } from '../entities/partido.entity';
import { PartidosService } from './partidos.service';
import { PartidosController } from './partidos.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Partido.name, schema: PartidoSchema }
    ])
  ],
  controllers: [PartidosController],
  providers: [PartidosService],
  exports: [PartidosService],
})
export class PartidosModule {}
