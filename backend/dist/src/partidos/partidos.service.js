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
exports.PartidosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const partido_entity_1 = require("../entities/partido.entity");
let PartidosService = class PartidosService {
    partidoModel;
    constructor(partidoModel) {
        this.partidoModel = partidoModel;
    }
    async findAll() {
        return this.partidoModel.find().exec();
    }
    async findById(id) {
        return this.partidoModel.findById(id).exec();
    }
    async create(data) {
        try {
            if (!data.nombre || !data.sigla || !data.color) {
                throw new common_1.BadRequestException('nombre, sigla y color son requeridos');
            }
            const partido = new this.partidoModel(data);
            return await partido.save();
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.HttpException('Ya existe un partido con esa sigla', common_1.HttpStatus.CONFLICT);
            }
            throw new common_1.HttpException('Error al crear partido', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.PartidosService = PartidosService;
exports.PartidosService = PartidosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(partido_entity_1.Partido.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PartidosService);
//# sourceMappingURL=partidos.service.js.map