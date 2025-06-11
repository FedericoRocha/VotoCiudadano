import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Voto, VotoSchema } from '../entities/voto.entity';
import { Partido, PartidoSchema } from '../entities/partido.entity';
import { VotosService } from './votos.service';
import { VotosController } from './votos.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Voto.name, schema: VotoSchema },
      { name: Partido.name, schema: PartidoSchema }
    ])
  ],
  controllers: [VotosController],
  providers: [VotosService],
  exports: [VotosService],
})
export class VotosModule {}
