import { connect, disconnect, model } from 'mongoose';
import { Partido, PartidoSchema } from '../src/entities/partido.entity';

const PartidoModel = model('Partido', PartidoSchema);

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
    // Conectar a la base de datos
    await connect('mongodb://localhost:27017/votociudadano');
    console.log('Conectado a la base de datos');

    // Crear el modelo
    const PartidoModel = model<Partido>('Partido', PartidoSchema);

    // Eliminar datos existentes
    await PartidoModel.deleteMany({});
    console.log('Datos de partidos existentes eliminados');

    // Insertar nuevos datos
    const createdPartidos = await PartidoModel.insertMany(partidos);
    console.log(`${createdPartidos.length} partidos insertados exitosamente`);

    // Mostrar los partidos insertados
    console.log('Partidos insertados:');
    createdPartidos.forEach(partido => {
      console.log(`- ${partido.nombre} (${partido.sigla})`);
    });

  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
  } finally {
    // Desconectar de la base de datos
    await disconnect();
    console.log('Desconectado de la base de datos');
  }
}

seed();
