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
exports.VotosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const voto_entity_1 = require("../entities/voto.entity");
const partido_entity_1 = require("../entities/partido.entity");
let VotosService = class VotosService {
    votoModel;
    partidoModel;
    constructor(votoModel, partidoModel) {
        this.votoModel = votoModel;
        this.partidoModel = partidoModel;
    }
    async findAll() {
        return this.votoModel.find().populate('partido').exec();
    }
    async findById(id) {
        if (!mongoose_2.Types.ObjectId.isValid(id)) {
            return null;
        }
        return this.votoModel.findById(id).populate('partido').exec();
    }
    async findFiltered(provincia, localidad, partidoId) {
        const query = {};
        if (provincia)
            query.provincia = provincia;
        if (localidad)
            query.localidad = localidad;
        if (partidoId && mongoose_2.Types.ObjectId.isValid(partidoId)) {
            query.partido = new mongoose_2.Types.ObjectId(partidoId);
        }
        return this.votoModel.find(query).populate('partido').exec();
    }
    async getVotingStats() {
        console.log('🔍 [VotosService] getVotingStats - Iniciando');
        console.log('📊 [VotosService] Contando total de votos...');
        const totalVotos = await this.votoModel.countDocuments().exec();
        console.log(`📊 [VotosService] Total de votos: ${totalVotos}`);
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
            { $limit: 10 }
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
    async create(data) {
        try {
            console.log('Buscando partido con ID o sigla:', data.partidoSigla);
            const partido = await this.partidoModel.findOne({ sigla: data.partidoSigla }).exec();
            if (!partido) {
                throw new common_1.BadRequestException(`Partido con sigla '${data.partidoSigla}' no encontrado`);
            }
            const votoData = {
                mesa: data.mesa,
                provincia: data.provincia,
                localidad: data.localidad,
                partido: partido._id,
                cantidad: data.cantidad || 1,
                fecha: new Date(),
            };
            console.log('Guardando voto con datos:', votoData);
            const createdVoto = new this.votoModel(votoData);
            const savedVoto = await createdVoto.save();
            return savedVoto.populate('partido');
        }
        catch (error) {
            console.error('Error en el servicio al crear voto:', error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.BadRequestException('Error al procesar el voto: ' + error.message);
        }
    }
};
exports.VotosService = VotosService;
exports.VotosService = VotosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(voto_entity_1.Voto.name)),
    __param(1, (0, mongoose_1.InjectModel)(partido_entity_1.Partido.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], VotosService);
//# sourceMappingURL=votos.service.js.map