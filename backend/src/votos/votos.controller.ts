import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Query, 
  ValidationPipe, 
  UseGuards, 
  Param,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
  HttpStatus,
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { VotosService } from './votos.service';
import { CreateVotoDto } from './dto/create-voto.dto';
import { Voto } from '../entities/voto.entity';

@Controller('votos')
export class VotosController {
  constructor(private readonly votosService: VotosService) {}

  @Get()
  async findAll(
    @Query('provincia') provincia?: string,
    @Query('localidad') localidad?: string,
    @Query('partidoId') partidoId?: string,
  ): Promise<Voto[]> {
    return this.votosService.findFiltered(provincia, localidad, partidoId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Voto> {
    const voto = await this.votosService.findById(id);
    if (!voto) {
      throw new NotFoundException('Voto no encontrado');
    }
    return voto;
  }

  @Get('stats')
  @HttpCode(HttpStatus.OK)
  async getStats() {
    console.log('🚀 [VotosController] GET /votos/stats - Iniciando solicitud');
    console.log('📡 [VotosController] Ruta accesible - Controlador alcanzado');
    try {
      console.log('🔍 [VotosController] Llamando a votosService.getVotingStats()');
      const stats = await this.votosService.getVotingStats();
      console.log('✅ [VotosController] Estadísticas obtenidas con éxito:', JSON.stringify(stats, null, 2).substring(0, 200) + '...');
      return stats;
    } catch (error) {
      console.error('❌ [VotosController] Error al obtener estadísticas:', error);
      throw new InternalServerErrorException('Error al obtener estadísticas de votación: ' + error.message);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body(new ValidationPipe()) data: CreateVotoDto): Promise<Voto> {
    console.log('Recibiendo solicitud para crear voto:', data);
    try {
      // Asegurarse de que la cantidad sea al menos 1
      const votoData = {
        ...data,
        cantidad: data.cantidad || 1
      };
      const voto = await this.votosService.create(votoData);
      console.log('Voto creado exitosamente:', voto);
      return voto;
    } catch (error) {
      console.error('Error en el controlador al crear voto:', error);
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new InternalServerErrorException('Error al procesar el voto: ' + error.message);
    }
  }

  @Get('stats/totales')
  @HttpCode(HttpStatus.OK)
  async getEstadisticas() {
    console.log('📊 [VotosController] GET /votos/stats/totales - Obteniendo estadísticas totales');
    try {
      const stats = await this.votosService.stats();
      console.log('✅ [VotosController] Estadísticas totales obtenidas con éxito');
      return stats;
    } catch (error) {
      console.error('❌ [VotosController] Error al obtener estadísticas totales:', error);
      throw new InternalServerErrorException('Error al obtener estadísticas totales: ' + error.message);
    }
  }
}
