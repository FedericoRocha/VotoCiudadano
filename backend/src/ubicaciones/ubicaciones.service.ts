import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Provincia, ProvinciaDocument } from './entities/provincia.entity';
import { Localidad, LocalidadDocument } from './entities/localidad.entity';
import { Escuela, EscuelaDocument } from './entities/escuela.entity';

@Injectable()
export class UbicacionesService {
  constructor(
    @InjectModel(Provincia.name) private provinciaModel: Model<ProvinciaDocument>,
    @InjectModel(Localidad.name) private localidadModel: Model<LocalidadDocument>,
    @InjectModel(Escuela.name) private escuelaModel: Model<EscuelaDocument>,
  ) {}

  // Provincias
  async findAllProvincias() {
    return this.provinciaModel.find().sort({ nombre: 1 }).exec();
  }

  async findProvinciaById(id: string) {
    return this.provinciaModel.findById(id).exec();
  }

  // Localidades
  async findLocalidadesByProvincia(provinciaId: string) {
    return this.localidadModel
      .find({ provincia: provinciaId })
      .sort({ nombre: 1 })
      .exec();
  }

  async findLocalidadById(id: string) {
    return this.localidadModel.findById(id).populate('provincia').exec();
  }

  // Escuelas
  async findEscuelasByLocalidad(localidadId: string) {
    return this.escuelaModel
      .find({ localidad: localidadId })
      .sort({ nombre: 1 })
      .exec();
  }

  async findEscuelaById(id: string) {
    return this.escuelaModel.findById(id).populate('localidad').exec();
  }
}
