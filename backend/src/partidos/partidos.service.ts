import { Injectable, BadRequestException, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partido, PartidoDocument } from '../entities/partido.entity';

@Injectable()
export class PartidosService {
  constructor(
    @InjectModel(Partido.name) 
    private partidoModel: Model<PartidoDocument>,
  ) {}

  async findAll(): Promise<Partido[]> {
    return this.partidoModel.find().exec();
  }

  async findById(id: string): Promise<Partido | null> {
    return this.partidoModel.findById(id).exec();
  }

  async create(data: Partial<Partido>): Promise<Partido> {
    try {
      if (!data.nombre || !data.sigla || !data.color) {
        throw new BadRequestException('nombre, sigla y color son requeridos');
      }
      
      const partido = new this.partidoModel(data);
      return await partido.save();
    } catch (error) {
      if (error.code === 11000) { // Código de error de MongoDB para duplicados
        throw new HttpException('Ya existe un partido con esa sigla', HttpStatus.CONFLICT);
      }
      throw new HttpException('Error al crear partido', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
