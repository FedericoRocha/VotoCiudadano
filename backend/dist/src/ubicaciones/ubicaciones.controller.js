"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UbicacionesController = void 0;
const common_1 = require("@nestjs/common");
const ubicaciones_service_1 = require("./ubicaciones.service");
const swagger_1 = require("@nestjs/swagger");
let UbicacionesController = class UbicacionesController {
    ubicacionesService;
    constructor(ubicacionesService) {
        this.ubicacionesService = ubicacionesService;
    }
    async getProvincias() {
        return this.ubicacionesService.findAllProvincias();
    }
    async getProvincia(id) {
        const provincia = await this.ubicacionesService.findProvinciaById(id);
        if (!provincia) {
            throw new common_1.NotFoundException('Provincia no encontrada');
        }
        return provincia;
    }
    async getLocalidadesByProvincia(provinciaId) {
        const localidades = await this.ubicacionesService.findLocalidadesByProvincia(provinciaId);
        if (!localidades || localidades.length === 0) {
            throw new common_1.NotFoundException('No se encontraron localidades para esta provincia');
        }
        return localidades;
    }
    async getLocalidad(id) {
        const localidad = await this.ubicacionesService.findLocalidadById(id);
        if (!localidad) {
            throw new common_1.NotFoundException('Localidad no encontrada');
        }
        return localidad;
    }
    async getEscuelasByLocalidad(localidadId) {
        const escuelas = await this.ubicacionesService.findEscuelasByLocalidad(localidadId);
        if (!escuelas || escuelas.length === 0) {
            throw new common_1.NotFoundException('No se encontraron escuelas para esta localidad');
        }
        return escuelas;
    }
    async getEscuela(id) {
        const escuela = await this.ubicacionesService.findEscuelaById(id);
        if (!escuela) {
            throw new common_1.NotFoundException('Escuela no encontrada');
        }
        return escuela;
    }
};
exports.UbicacionesController = UbicacionesController;
__decorate([
    (0, common_1.Get)('provincias'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener todas las provincias' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de provincias' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UbicacionesController.prototype, "getProvincias", null);
__decorate([
    (0, common_1.Get)('provincias/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una provincia por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Provincia encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Provincia no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UbicacionesController.prototype, "getProvincia", null);
__decorate([
    (0, common_1.Get)('provincias/:provinciaId/localidades'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener localidades por provincia' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de localidades' }),
    __param(0, (0, common_1.Param)('provinciaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UbicacionesController.prototype, "getLocalidadesByProvincia", null);
__decorate([
    (0, common_1.Get)('localidades/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una localidad por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Localidad encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Localidad no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UbicacionesController.prototype, "getLocalidad", null);
__decorate([
    (0, common_1.Get)('localidades/:localidadId/escuelas'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener escuelas por localidad' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de escuelas' }),
    __param(0, (0, common_1.Param)('localidadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UbicacionesController.prototype, "getEscuelasByLocalidad", null);
__decorate([
    (0, common_1.Get)('escuelas/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Obtener una escuela por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Escuela encontrada' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Escuela no encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UbicacionesController.prototype, "getEscuela", null);
exports.UbicacionesController = UbicacionesController = __decorate([
    (0, swagger_1.ApiTags)('Ubicaciones'),
    (0, common_1.Controller)('ubicaciones'),
    __metadata("design:paramtypes", [ubicaciones_service_1.UbicacionesService])
], UbicacionesController);
//# sourceMappingURL=ubicaciones.controller.js.map