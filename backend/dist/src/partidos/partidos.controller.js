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
exports.PartidosController = void 0;
const common_1 = require("@nestjs/common");
const partidos_service_1 = require("./partidos.service");
const create_partido_dto_1 = require("./dto/create-partido.dto");
const swagger_1 = require("@nestjs/swagger");
let PartidosController = class PartidosController {
    partidosService;
    constructor(partidosService) {
        this.partidosService = partidosService;
    }
    async findAll() {
        return this.partidosService.findAll();
    }
    async findOne(id) {
        const partido = await this.partidosService.findById(id);
        if (!partido) {
            throw new common_1.NotFoundException('Partido no encontrado');
        }
        return partido;
    }
    async create(data) {
        return this.partidosService.create(data);
    }
};
exports.PartidosController = PartidosController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PartidosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PartidosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_partido_dto_1.CreatePartidoDto]),
    __metadata("design:returntype", Promise)
], PartidosController.prototype, "create", null);
exports.PartidosController = PartidosController = __decorate([
    (0, swagger_1.ApiTags)('partidos'),
    (0, common_1.Controller)('partidos'),
    __metadata("design:paramtypes", [partidos_service_1.PartidosService])
], PartidosController);
//# sourceMappingURL=partidos.controller.js.map