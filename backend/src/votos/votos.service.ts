import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Voto, VotoDocument } from '../entities/voto.entity';
import { Partido } from '../entities/partido.entity';

@Injectable()
export class VotosService {
  constructor(
    @InjectModel(Voto.name) 
    private votoModel: Model<VotoDocument>,
    @InjectModel(Partido.name)
    private partidoModel: Model<Partido>,
  ) {}

  async findAll(): Promise<Voto[]> {
    return this.votoModel.find().populate('partido').exec();
  }

  async findById(id: string): Promise<Voto | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.votoModel.findById(id).populate('partido').exec();
  }

  async findFiltered(provincia?: string, localidad?: string, partidoId?: string): Promise<Voto[]> {
    const query: any = {};
    if (provincia) query.provincia = provincia;
    if (localidad) query.localidad = localidad;
    if (partidoId && Types.ObjectId.isValid(partidoId)) {
      query.partido = new Types.ObjectId(partidoId);
    }
    return this.votoModel.find(query).populate('partido').exec();
  }

  async getVotingStats() {
    console.log('🔍 [VotosService] getVotingStats - Iniciando');
    
    // Obtener el total de votos
    console.log('📊 [VotosService] Contando total de votos...');
    const totalVotos = await this.votoModel.countDocuments().exec();
    console.log(`📊 [VotosService] Total de votos: ${totalVotos}`);
    
    // Obtener conteo por partido
    console.log('🔍 [VotosService] Obteniendo estadísticas por partido...');
    const porPartido = await this.votoModel.aggregate([
      {
        $group: {
          _id: '$partido',
          total: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'partidos',
          localField: '_id',
          foreignField: '_id',
          as: 'partidoInfo'
        }
      },
      { $unwind: '$partidoInfo' },
      {
        $project: {
          _id: 0,
          partido: {
            id: '$_id',
            nombre: '$partidoInfo.nombre',
            sigla: '$partidoInfo.sigla',
            color: '$partidoInfo.color'
          },
          total: 1
        }
      },
      { $sort: { total: -1 } }
    ]);

    // Obtener conteo por provincia
    console.log('🌎 [VotosService] Obteniendo estadísticas por provincia...');
    const porProvincia = await this.votoModel.aggregate([
      {
        $group: {
          _id: '$provincia',
          total: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);

    // Obtener conteo por localidad
    console.log('🏙️ [VotosService] Obteniendo estadísticas por localidad...');
    const porLocalidad = await this.votoModel.aggregate([
      {
        $group: {
          _id: {
            provincia: '$provincia',
            localidad: '$localidad'
          },
          total: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } },
      { $limit: 10 } // Top 10 localidades con más votos
    ]);

    const result = {
      totalVotos,
      porPartido,
      porProvincia,
      topLocalidades: porLocalidad,
      timestamp: new Date()
    };
    
    console.log('✅ [VotosService] getVotingStats - Finalizado con éxito');
    console.log('📦 Resultado:', JSON.stringify(result, null, 2).substring(0, 200) + '...');
    
    return result;
  }

  // Método stats antiguo (mantenido por compatibilidad)
  async stats() {
    const total = await this.votoModel.countDocuments().exec();
    
    const totalPorPartido = await this.votoModel.aggregate([
      {
        $group: {
          _id: '$partido',
          cantidad: { $sum: '$cantidad' }
        }
      },
      {
        $lookup: {
          from: 'partidos',
          localField: '_id',
          foreignField: '_id',
          as: 'partidoInfo'
        }
      },
      {
        $unwind: '$partidoInfo'
      },
      {
        $project: {
          partidoId: '$_id',
          partido: '$partidoInfo.nombre',
          sigla: '$partidoInfo.sigla',
          cantidad: 1,
          _id: 0
        }
      }
    ]).exec();

    return { 
      total,
      totalPorPartido 
    };
  }

  async create(data: { mesa: string; provincia: string; localidad: string; partidoSigla: string; cantidad?: number }): Promise<Voto> {
    try {
      console.log('Buscando partido con ID o sigla:', data.partidoSigla);
      
      // Buscar el partido por sigla
      const partido = await this.partidoModel.findOne({ sigla: data.partidoSigla }).exec();
      
      if (!partido) {
        throw new BadRequestException(`Partido con sigla '${data.partidoSigla}' no encontrado`);
      }

      const votoData = {
        mesa: data.mesa,
        provincia: data.provincia,
        localidad: data.localidad,
        partido: partido._id, // Guardamos la referencia al ID del partido
        cantidad: data.cantidad || 1,
        fecha: new Date(),
      };

      console.log('Guardando voto con datos:', votoData);
      const createdVoto = new this.votoModel(votoData);
      const savedVoto = await createdVoto.save();
      
      // Populate para devolver los datos del partido
      return savedVoto.populate('partido');
    } catch (error) {
      console.error('Error en el servicio al crear voto:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Error al procesar el voto: ' + error.message);
    }
  }
}
