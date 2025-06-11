"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UbicacionesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const ubicaciones_controller_1 = require("./ubicaciones.controller");
const ubicaciones_service_1 = require("./ubicaciones.service");
const provincia_entity_1 = require("./entities/provincia.entity");
const localidad_entity_1 = require("./entities/localidad.entity");
const escuela_entity_1 = require("./entities/escuela.entity");
let UbicacionesModule = class UbicacionesModule {
};
exports.UbicacionesModule = UbicacionesModule;
exports.UbicacionesModule = UbicacionesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: provincia_entity_1.Provincia.name, schema: provincia_entity_1.ProvinciaSchema },
                { name: localidad_entity_1.Localidad.name, schema: localidad_entity_1.LocalidadSchema },
                { name: escuela_entity_1.Escuela.name, schema: escuela_entity_1.EscuelaSchema },
            ]),
        ],
        controllers: [ubicaciones_controller_1.UbicacionesController],
        providers: [ubicaciones_service_1.UbicacionesService],
        exports: [ubicaciones_service_1.UbicacionesService],
    })
], UbicacionesModule);
//# sourceMappingURL=ubicaciones.module.js.map