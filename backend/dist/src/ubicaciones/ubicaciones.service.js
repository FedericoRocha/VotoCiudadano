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
exports.UbicacionesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const provincia_entity_1 = require("./entities/provincia.entity");
const localidad_entity_1 = require("./entities/localidad.entity");
const escuela_entity_1 = require("./entities/escuela.entity");
let UbicacionesService = class UbicacionesService {
    provinciaModel;
    localidadModel;
    escuelaModel;
    constructor(provinciaModel, localidadModel, escuelaModel) {
        this.provinciaModel = provinciaModel;
        this.localidadModel = localidadModel;
        this.escuelaModel = escuelaModel;
    }
    async findAllProvincias() {
        return this.provinciaModel.find().sort({ nombre: 1 }).exec();
    }
    async findProvinciaById(id) {
        return this.provinciaModel.findById(id).exec();
    }
    async findLocalidadesByProvincia(provinciaId) {
        return this.localidadModel
            .find({ provincia: provinciaId })
            .sort({ nombre: 1 })
            .exec();
    }
    async findLocalidadById(id) {
        return this.localidadModel.findById(id).populate('provincia').exec();
    }
    async findEscuelasByLocalidad(localidadId) {
        return this.escuelaModel
            .find({ localidad: localidadId })
            .sort({ nombre: 1 })
            .exec();
    }
    async findEscuelaById(id) {
        return this.escuelaModel.findById(id).populate('localidad').exec();
    }
};
exports.UbicacionesService = UbicacionesService;
exports.UbicacionesService = UbicacionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(provincia_entity_1.Provincia.name)),
    __param(1, (0, mongoose_1.InjectModel)(localidad_entity_1.Localidad.name)),
    __param(2, (0, mongoose_1.InjectModel)(escuela_entity_1.Escuela.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], UbicacionesService);
//# sourceMappingURL=ubicaciones.service.js.map