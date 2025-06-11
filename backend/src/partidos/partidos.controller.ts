import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  ValidationPipe, 
  UseGuards, 
  Param, 
  NotFoundException 
} from '@nestjs/common';
import { PartidosService } from './partidos.service';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { Partido } from '../entities/partido.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('partidos')
@Controller('partidos')
export class PartidosController {
  constructor(private readonly partidosService: PartidosService) {}

  @Get()
  async findAll(): Promise<Partido[]> {
    return this.partidosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Partido> {
    const partido = await this.partidosService.findById(id);
    if (!partido) {
      throw new NotFoundException('Partido no encontrado');
    }
    return partido;
  }

  @Post()
  async create(@Body(new ValidationPipe()) data: CreatePartidoDto): Promise<Partido> {
    return this.partidosService.create(data);
  }
}
