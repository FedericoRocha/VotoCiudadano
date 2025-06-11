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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotoSchema = exports.Voto = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Voto = class Voto {
    mesa;
    provincia;
    localidad;
    partido;
    cantidad;
};
exports.Voto = Voto;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Voto.prototype, "mesa", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Voto.prototype, "provincia", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Voto.prototype, "localidad", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'Partido', required: true }),
    __metadata("design:type", Object)
], Voto.prototype, "partido", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Voto.prototype, "cantidad", void 0);
exports.Voto = Voto = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], Voto);
exports.VotoSchema = mongoose_1.SchemaFactory.createForClass(Voto);
exports.VotoSchema.index({ mesa: 1 });
exports.VotoSchema.index({ provincia: 1 });
exports.VotoSchema.index({ localidad: 1 });
exports.VotoSchema.index({ partido: 1 });
//# sourceMappingURL=voto.entity.js.map