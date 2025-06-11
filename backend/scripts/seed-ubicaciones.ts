import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Provincia } from '../src/ubicaciones/entities/provincia.entity';
import { Localidad } from '../src/ubicaciones/entities/localidad.entity';
import { Escuela } from '../src/ubicaciones/entities/escuela.entity';
import axios from 'axios';

// Interfaz para el tipo de escuela
interface EscuelaData {
  nombre: string;
  direccion: string;
  telefono: string;
  codigo: string;
}

// Configuración de la API de GeoRef Argentina
const GEOREF_API = 'https://apis.datos.gob.ar/georef/api';

// Lista de provincias con sus códigos INDEC
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

// Función para obtener localidades de una provincia usando la API de GeoRef
async function obtenerLocalidades(provinciaCodigo: string) {
  try {
    const response = await axios.get(`${GEOREF_API}/localidades`, {
      params: {
        provincia: provinciaCodigo,
        max: 1000, // Número máximo de localidades a obtener
        orden: 'nombre',
      },
    });
    
    return response.data.localidades || [];
  } catch (error) {
    console.error(`Error al obtener localidades para provincia ${provinciaCodigo}:`, error);
    return [];
  }
}

// Función para generar datos de escuelas de ejemplo para una localidad
function generarEscuelasEjemplo(localidad: any, provincia: string): EscuelaData[] {
  const tiposEscuelas = [
    'Escuela Primaria',
    'Colegio Secundario',
    'Escuela Técnica',
    'Instituto Superior',
    'Centro Educativo',
  ];

  const escuelas: EscuelaData[] = [];
  const numEscuelas = Math.floor(Math.random() * 3) + 1; // 1-3 escuelas por localidad
  
  for (let i = 0; i < numEscuelas; i++) {
    const tipoIndex = i % tiposEscuelas.length;
    const nombre = `${tiposEscuelas[tipoIndex]} ${localidad.nombre.split(' ')[0]} ${i + 1}`;
    
    const escuela: EscuelaData = {
      nombre: nombre,
      direccion: `Calle ${Math.floor(Math.random() * 1000)} #${Math.floor(Math.random() * 5000)}`,
      telefono: `11${Math.floor(1000000 + Math.random() * 9000000)}`,
      codigo: `ESC-${provincia.substring(0, 2)}-${localidad.id?.substring(0, 4) || '0000'}-${i + 1}`,
    };
    
    escuelas.push(escuela);
  }
  
  return escuelas;
}

// Usamos las provincias definidas arriba
const provinciasData = PROVINCIAS.map(p => ({
  nombre: p.nombre,
  codigoIndec: p.codigo
}));

// No definimos localidades ni escuelas estáticas, las obtendremos de la API

async function seedUbicaciones() {
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    console.log('Iniciando la carga de datos de ubicaciones...');
    
    // Obtener modelos
    const provinciaModel = app.get<Model<Provincia>>(getModelToken(Provincia.name));
    const localidadModel = app.get<Model<Localidad>>(getModelToken(Localidad.name));
    const escuelaModel = app.get<Model<Escuela>>(getModelToken(Escuela.name));
    
    // Limpiar datos existentes
    console.log('Limpiando datos existentes...');
    await escuelaModel.deleteMany({}).exec();
    await localidadModel.deleteMany({}).exec();
    await provinciaModel.deleteMany({}).exec();
    
    // Insertar provincias
    console.log('Insertando provincias...');
    const provincias = await provinciaModel.insertMany(provinciasData);
    
    // Mapa para almacenar provincias por código INDEC para referencia rápida
    const provinciasMap = new Map(provincias.map(p => [p.codigoIndec, p]));
    
    // Procesar cada provincia para obtener sus localidades
    for (const provincia of provincias) {
      console.log(`Obteniendo localidades para ${provincia.nombre}...`);
      
      try {
        // Obtener localidades de la API de GeoRef
        const localidades = await obtenerLocalidades(provincia.codigoIndec);
        
        if (localidades.length === 0) {
          console.log(`No se encontraron localidades para ${provincia.nombre}`);
          continue;
        }
        
        // Insertar localidades para esta provincia
        const localidadesToInsert = localidades.map(localidad => ({
          nombre: localidad.nombre,
          codigoIndec: localidad.id?.toString() || '',
          codigoPostal: localidad.codigo_postal?.toString() || '',
          provincia: provincia._id,
        }));
        
        console.log(`Insertando ${localidadesToInsert.length} localidades para ${provincia.nombre}...`);
        const localidadesInsertadas = await localidadModel.insertMany(localidadesToInsert);
        
        // Para cada localidad, generar escuelas de ejemplo
        for (const localidad of localidadesInsertadas) {
          // Generar entre 1-3 escuelas por localidad
          const escuelas = generarEscuelasEjemplo(localidad, provincia.nombre);
          
          if (escuelas.length > 0) {
            const escuelasToInsert = escuelas.map((escuela: EscuelaData) => ({
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
        
        // Pequeña pausa para no saturar la API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`Error al procesar localidades para ${provincia.nombre}:`, error);
      }
    }
    
    console.log('¡Datos de ubicaciones cargados exitosamente!');
    
  } catch (error) {
    console.error('Error al cargar los datos de ubicaciones:', error);
  } finally {
    await app.close();
    process.exit(0);
  }
}

seedUbicaciones();
