import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UbicacionesController } from './ubicaciones.controller';
import { UbicacionesService } from './ubicaciones.service';
import { Provincia, ProvinciaSchema } from './entities/provincia.entity';
import { Localidad, LocalidadSchema } from './entities/localidad.entity';
import { Escuela, EscuelaSchema } from './entities/escuela.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Provincia.name, schema: ProvinciaSchema },
      { name: Localidad.name, schema: LocalidadSchema },
      { name: Escuela.name, schema: EscuelaSchema },
    ]),
  ],
  controllers: [UbicacionesController],
  providers: [UbicacionesService],
  exports: [UbicacionesService],
})
export class UbicacionesModule {}
