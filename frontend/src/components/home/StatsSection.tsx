import { motion } from 'framer-motion';
import { Users, MapPin, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getStats, getProvincias } from '../../services/api';



const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const StatsSection = () => {
  // Obtener votos registrados
  const { data: statsData, isLoading: isLoadingStats, error: statsError } = useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
    retry: 1,
    refetchInterval: 30000,
  });

  // DEBUG: ver estructura real de statsData
  if (statsData) {
    // eslint-disable-next-line no-console
    console.log('StatsSection statsData:', statsData);
  }


  // Obtener provincias
  const { data: provinciasData, isLoading: isLoadingProvincias, error: provinciasError } = useQuery({
    queryKey: ['provincias'],
    queryFn: getProvincias,
    retry: 1,
  });

  // Obtener total de votos (usa totalVotos o el primer valor numérico que encuentre)
  let totalVotos = '—';
  if (!isLoadingStats && !statsError && statsData) {
    if (typeof statsData.totalVotos === 'number') {
      totalVotos = statsData.totalVotos.toLocaleString('es-AR');
    } else {
      // Buscar el primer valor numérico en la respuesta
      const numericValue = Object.values(statsData).find(val => typeof val === 'number');
      if (numericValue !== undefined) {
        totalVotos = numericValue.toLocaleString('es-AR');
      }
    }
  } else if (isLoadingStats) {
    totalVotos = '…';
  }

  const totalProvincias = isLoadingProvincias ? '…' : provinciasError ? '—' : provinciasData?.length ?? '—';

  // Mostrar participación real si existe
  let participacion = '—';
  if (!isLoadingStats && !statsError && typeof statsData?.participacion !== 'undefined') {
    participacion = typeof statsData.participacion === 'number'
      ? statsData.participacion.toFixed(1) + '%'
      : statsData.participacion;
  }

  const stats = [
    { id: 1, name: 'Votos registrados', value: totalVotos, icon: Users },
    { id: 2, name: 'Provincias', value: totalProvincias, icon: MapPin },
    { id: 3, name: 'Participación', value: participacion, icon: TrendingUp },
  ];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Participación ciudadana en tiempo real
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Únete a miles de ciudadanos que ya están compartiendo sus preferencias electorales
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 gap-8 sm:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={stat.id} 
                className="px-6 py-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                variants={item}
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-blue-100 text-blue-600 mb-5">
                  <Icon className="w-8 h-8" />
                </div>
                <p className="text-4xl font-bold text-gray-900">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-gray-500">{stat.name}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
