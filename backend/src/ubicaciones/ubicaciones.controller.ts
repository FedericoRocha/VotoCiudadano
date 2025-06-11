import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { UbicacionesService } from './ubicaciones.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Ubicaciones')
@Controller('ubicaciones')
export class UbicacionesController {
  constructor(private readonly ubicacionesService: UbicacionesService) {}

  @Get('provincias')
  @ApiOperation({ summary: 'Obtener todas las provincias' })
  @ApiResponse({ status: 200, description: 'Lista de provincias' })
  async getProvincias() {
    return this.ubicacionesService.findAllProvincias();
  }

  @Get('provincias/:id')
  @ApiOperation({ summary: 'Obtener una provincia por ID' })
  @ApiResponse({ status: 200, description: 'Provincia encontrada' })
  @ApiResponse({ status: 404, description: 'Provincia no encontrada' })
  async getProvincia(@Param('id') id: string) {
    const provincia = await this.ubicacionesService.findProvinciaById(id);
    if (!provincia) {
      throw new NotFoundException('Provincia no encontrada');
    }
    return provincia;
  }

  @Get('provincias/:provinciaId/localidades')
  @ApiOperation({ summary: 'Obtener localidades por provincia' })
  @ApiResponse({ status: 200, description: 'Lista de localidades' })
  async getLocalidadesByProvincia(@Param('provinciaId') provinciaId: string) {
    const localidades = await this.ubicacionesService.findLocalidadesByProvincia(provinciaId);
    if (!localidades || localidades.length === 0) {
      throw new NotFoundException('No se encontraron localidades para esta provincia');
    }
    return localidades;
  }

  @Get('localidades/:id')
  @ApiOperation({ summary: 'Obtener una localidad por ID' })
  @ApiResponse({ status: 200, description: 'Localidad encontrada' })
  @ApiResponse({ status: 404, description: 'Localidad no encontrada' })
  async getLocalidad(@Param('id') id: string) {
    const localidad = await this.ubicacionesService.findLocalidadById(id);
    if (!localidad) {
      throw new NotFoundException('Localidad no encontrada');
    }
    return localidad;
  }

  @Get('localidades/:localidadId/escuelas')
  @ApiOperation({ summary: 'Obtener escuelas por localidad' })
  @ApiResponse({ status: 200, description: 'Lista de escuelas' })
  async getEscuelasByLocalidad(@Param('localidadId') localidadId: string) {
    const escuelas = await this.ubicacionesService.findEscuelasByLocalidad(localidadId);
    if (!escuelas || escuelas.length === 0) {
      throw new NotFoundException('No se encontraron escuelas para esta localidad');
    }
    return escuelas;
  }

  @Get('escuelas/:id')
  @ApiOperation({ summary: 'Obtener una escuela por ID' })
  @ApiResponse({ status: 200, description: 'Escuela encontrada' })
  @ApiResponse({ status: 404, description: 'Escuela no encontrada' })
  async getEscuela(@Param('id') id: string) {
    const escuela = await this.ubicacionesService.findEscuelaById(id);
    if (!escuela) {
      throw new NotFoundException('Escuela no encontrada');
    }
    return escuela;
  }
}
