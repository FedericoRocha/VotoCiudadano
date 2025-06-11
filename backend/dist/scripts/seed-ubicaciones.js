"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../src/app.module");
const mongoose_1 = require("@nestjs/mongoose");
const provincia_entity_1 = require("../src/ubicaciones/entities/provincia.entity");
const localidad_entity_1 = require("../src/ubicaciones/entities/localidad.entity");
const escuela_entity_1 = require("../src/ubicaciones/entities/escuela.entity");
const axios_1 = require("axios");
const GEOREF_API = 'https://apis.datos.gob.ar/georef/api';
const PROVINCIAS = [
    { nombre: 'Buenos Aires', codigo: '06' },
    { nombre: 'CABA', codigo: '02' },
    { nombre: 'Catamarca', codigo: '10' },
    { nombre: 'Córdoba', codigo: '14' },
    { nombre: 'Corrientes', codigo: '18' },
    { nombre: 'Chaco', codigo: '22' },
    { nombre: 'Chubut', codigo: '26' },
    { nombre: 'Entre Ríos', codigo: '30' },
    { nombre: 'Formosa', codigo: '34' },
    { nombre: 'Jujuy', codigo: '38' },
    { nombre: 'La Pampa', codigo: '42' },
    { nombre: 'La Rioja', codigo: '46' },
    { nombre: 'Mendoza', codigo: '50' },
    { nombre: 'Misiones', codigo: '54' },
    { nombre: 'Neuquén', codigo: '58' },
    { nombre: 'Río Negro', codigo: '62' },
    { nombre: 'Salta', codigo: '66' },
    { nombre: 'San Juan', codigo: '70' },
    { nombre: 'San Luis', codigo: '74' },
    { nombre: 'Santa Cruz', codigo: '78' },
    { nombre: 'Santa Fe', codigo: '82' },
    { nombre: 'Santiago del Estero', codigo: '86' },
    { nombre: 'Tierra del Fuego', codigo: '94' },
    { nombre: 'Tucumán', codigo: '90' },
];
async function obtenerLocalidades(provinciaCodigo) {
    try {
        const response = await axios_1.default.get(`${GEOREF_API}/localidades`, {
            params: {
                provincia: provinciaCodigo,
                max: 1000,
                orden: 'nombre',
            },
        });
        return response.data.localidades || [];
    }
    catch (error) {
        console.error(`Error al obtener localidades para provincia ${provinciaCodigo}:`, error);
        return [];
    }
}
function generarEscuelasEjemplo(localidad, provincia) {
    const tiposEscuelas = [
        'Escuela Primaria',
        'Colegio Secundario',
        'Escuela Técnica',
        'Instituto Superior',
        'Centro Educativo',
    ];
    const escuelas = [];
    const numEscuelas = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numEscuelas; i++) {
        const tipoIndex = i % tiposEscuelas.length;
        const nombre = `${tiposEscuelas[tipoIndex]} ${localidad.nombre.split(' ')[0]} ${i + 1}`;
        const escuela = {
            nombre: nombre,
            direccion: `Calle ${Math.floor(Math.random() * 1000)} #${Math.floor(Math.random() * 5000)}`,
            telefono: `11${Math.floor(1000000 + Math.random() * 9000000)}`,
            codigo: `ESC-${provincia.substring(0, 2)}-${localidad.id?.substring(0, 4) || '0000'}-${i + 1}`,
        };
        escuelas.push(escuela);
    }
    return escuelas;
}
const provinciasData = PROVINCIAS.map(p => ({
    nombre: p.nombre,
    codigoIndec: p.codigo
}));
async function seedUbicaciones() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    try {
        console.log('Iniciando la carga de datos de ubicaciones...');
        const provinciaModel = app.get((0, mongoose_1.getModelToken)(provincia_entity_1.Provincia.name));
        const localidadModel = app.get((0, mongoose_1.getModelToken)(localidad_entity_1.Localidad.name));
        const escuelaModel = app.get((0, mongoose_1.getModelToken)(escuela_entity_1.Escuela.name));
        console.log('Limpiando datos existentes...');
        await escuelaModel.deleteMany({}).exec();
        await localidadModel.deleteMany({}).exec();
        await provinciaModel.deleteMany({}).exec();
        console.log('Insertando provincias...');
        const provincias = await provinciaModel.insertMany(provinciasData);
        const provinciasMap = new Map(provincias.map(p => [p.codigoIndec, p]));
        for (const provincia of provincias) {
            console.log(`Obteniendo localidades para ${provincia.nombre}...`);
            try {
                const localidades = await obtenerLocalidades(provincia.codigoIndec);
                if (localidades.length === 0) {
                    console.log(`No se encontraron localidades para ${provincia.nombre}`);
                    continue;
                }
                const localidadesToInsert = localidades.map(localidad => ({
                    nombre: localidad.nombre,
                    codigoIndec: localidad.id?.toString() || '',
                    codigoPostal: localidad.codigo_postal?.toString() || '',
                    provincia: provincia._id,
                }));
                console.log(`Insertando ${localidadesToInsert.length} localidades para ${provincia.nombre}...`);
                const localidadesInsertadas = await localidadModel.insertMany(localidadesToInsert);
                for (const localidad of localidadesInsertadas) {
                    const escuelas = generarEscuelasEjemplo(localidad, provincia.nombre);
                    if (escuelas.length > 0) {
                        const escuelasToInsert = escuelas.map((escuela) => ({
                            nombre: escuela.nombre,
                            direccion: escuela.direccion,
                            telefono: escuela.telefono,
                            codigo: escuela.codigo,
                            localidad: localidad._id,
                        }));
                        await escuelaModel.insertMany(escuelasToInsert);
                    }
                }
                console.log(`Procesadas ${localidadesInsertadas.length} localidades para ${provincia.nombre}`);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            catch (error) {
                console.error(`Error al procesar localidades para ${provincia.nombre}:`, error);
            }
        }
        console.log('¡Datos de ubicaciones cargados exitosamente!');
    }
    catch (error) {
        console.error('Error al cargar los datos de ubicaciones:', error);
    }
    finally {
        await app.close();
        process.exit(0);
    }
}
seedUbicaciones();
//# sourceMappingURL=seed-ubicaciones.js.map