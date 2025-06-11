"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const partido_entity_1 = require("../src/entities/partido.entity");
const PartidoModel = (0, mongoose_1.model)('Partido', partido_entity_1.PartidoSchema);
const partidos = [
    {
        nombre: 'Juntos por el Cambio',
        sigla: 'jxc',
        color: '#FFD700',
    },
    {
        nombre: 'Unión por la Patria',
        sigla: 'uxp',
        color: '#ADD8E6',
    },
    {
        nombre: 'La Libertad Avanza',
        sigla: 'lla',
        color: '#7FFFD4',
    },
    {
        nombre: 'Frente de Izquierda y de Trabajadores - Unidad',
        sigla: 'fit',
        color: '#FF0000',
    },
    {
        nombre: 'Hacemos por Nuestro País',
        sigla: 'hacemos',
        color: '#800080',
    },
    {
        nombre: 'Voto en Blanco',
        sigla: 'nulo',
        color: '#CCCCCC',
    },
    {
        nombre: 'Voto Recurrido',
        sigla: 'recurrido',
        color: '#FFA500',
    },
    {
        nombre: 'Voto Impugnado',
        sigla: 'impugnado',
        color: '#000000',
    },
];
async function seed() {
    try {
        await (0, mongoose_1.connect)('mongodb://localhost:27017/votociudadano');
        console.log('Conectado a la base de datos');
        const PartidoModel = (0, mongoose_1.model)('Partido', partido_entity_1.PartidoSchema);
        await PartidoModel.deleteMany({});
        console.log('Datos de partidos existentes eliminados');
        const createdPartidos = await PartidoModel.insertMany(partidos);
        console.log(`${createdPartidos.length} partidos insertados exitosamente`);
        console.log('Partidos insertados:');
        createdPartidos.forEach(partido => {
            console.log(`- ${partido.nombre} (${partido.sigla})`);
        });
    }
    catch (error) {
        console.error('Error al poblar la base de datos:', error);
    }
    finally {
        await (0, mongoose_1.disconnect)();
        console.log('Desconectado de la base de datos');
    }
}
seed();
//# sourceMappingURL=seed-partidos.js.map