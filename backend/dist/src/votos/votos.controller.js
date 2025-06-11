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
exports.VotosController = void 0;
const common_1 = require("@nestjs/common");
const votos_service_1 = require("./votos.service");
const create_voto_dto_1 = require("./dto/create-voto.dto");
let VotosController = class VotosController {
    votosService;
    constructor(votosService) {
        this.votosService = votosService;
    }
    async findAll(provincia, localidad, partidoId) {
        return this.votosService.findFiltered(provincia, localidad, partidoId);
    }
    async findOne(id) {
        const voto = await this.votosService.findById(id);
        if (!voto) {
            throw new common_1.NotFoundException('Voto no encontrado');
        }
        return voto;
    }
    async getStats() {
        console.log('🚀 [VotosController] GET /votos/stats - Iniciando solicitud');
        console.log('📡 [VotosController] Ruta accesible - Controlador alcanzado');
        try {
            console.log('🔍 [VotosController] Llamando a votosService.getVotingStats()');
            const stats = await this.votosService.getVotingStats();
            console.log('✅ [VotosController] Estadísticas obtenidas con éxito:', JSON.stringify(stats, null, 2).substring(0, 200) + '...');
            return stats;
        }
        catch (error) {
            console.error('❌ [VotosController] Error al obtener estadísticas:', error);
            throw new common_1.InternalServerErrorException('Error al obtener estadísticas de votación: ' + error.message);
        }
    }
    async create(data) {
        console.log('Recibiendo solicitud para crear voto:', data);
        try {
            const votoData = {
                ...data,
                cantidad: data.cantidad || 1
            };
            const voto = await this.votosService.create(votoData);
            console.log('Voto creado exitosamente:', voto);
            return voto;
        }
        catch (error) {
            console.error('Error en el controlador al crear voto:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Error al procesar el voto: ' + error.message);
        }
    }
    async getEstadisticas() {
        console.log('📊 [VotosController] GET /votos/stats/totales - Obteniendo estadísticas totales');
        try {
            const stats = await this.votosService.stats();
            console.log('✅ [VotosController] Estadísticas totales obtenidas con éxito');
            return stats;
        }
        catch (error) {
            console.error('❌ [VotosController] Error al obtener estadísticas totales:', error);
            throw new common_1.InternalServerErrorException('Error al obtener estadísticas totales: ' + error.message);
        }
    }
};
exports.VotosController = VotosController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('provincia')),
    __param(1, (0, common_1.Query)('localidad')),
    __param(2, (0, common_1.Query)('partidoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], VotosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VotosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('stats'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VotosController.prototype, "getStats", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_voto_dto_1.CreateVotoDto]),
    __metadata("design:returntype", Promise)
], VotosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('stats/totales'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VotosController.prototype, "getEstadisticas", null);
exports.VotosController = VotosController = __decorate([
    (0, common_1.Controller)('votos'),
    __metadata("design:paramtypes", [votos_service_1.VotosService])
], VotosController);
//# sourceMappingURL=votos.controller.js.map