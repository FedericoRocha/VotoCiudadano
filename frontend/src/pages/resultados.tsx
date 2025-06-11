import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// @ts-ignore
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Button } from '../components/ui/button';
import { 
  Download, 
  RefreshCw,
  Loader2
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getPartidos, getStats } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo } from 'react';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ChartDataLabels,
);

// Colores para los partidos
const PARTIDO_COLORS = [
  '#1E40AF', // Azul
  '#DC2626', // Rojo
  '#059669', // Verde
  '#7C3AED', // Violeta
  '#D97706', // Ámbar
  '#0284C7', // Azul claro
  '#9D174D', // Rosa
  '#4C1D95', // Índigo oscuro
  '#B45309', // Ámbar oscuro
  '#065F46', // Verde oscuro
];
  
// Opciones para las gráficas
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      color: '#222',
      font: {
        weight: 'bold' as const,
        size: 16,
      },
      formatter: (value: number) => `${value}%`,
      display: true,
      padding: {
        top: 8,
        bottom: 0
      }
    },
    tooltip: {
      callbacks: {
        label: function(context: any) {
          return `${context.dataset.label}: ${context.raw}%`;
        }
      },
      backgroundColor: '#fff',
      titleColor: '#222',
      bodyColor: '#222',
      borderColor: '#e5e7eb',
      borderWidth: 1,
    },
    legend: { display: false }
  },
  animation: {
    duration: 1200,
    easing: 'easeOutQuart' as const,
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        callback: (value: any) => `${value}%`,
        color: '#888',
        font: { weight: 'bold' as const, size: 14 }
      },
      grid: {
        color: '#f3f4f6',
        borderDash: [4, 4],
      }
    },
    x: {
      ticks: {
        color: '#444',
        font: { weight: 'bold' as const, size: 15 }
      },
      grid: {
        display: false
      }
    }
  },
  elements: {
    bar: {
      borderRadius: 12,
      borderSkipped: false,
    }
  }
};

const ResultadosPage = () => {
  const navigate = useNavigate();

  // Obtener datos de partidos
  const { 
    data: partidos, 
    isLoading: isLoadingPartidos, 
    error: partidosError 
  } = useQuery({
    queryKey: ['partidos'],
    queryFn: getPartidos,
    retry: 1,
  });

  // Obtener estadísticas
  const { 
    data: statsData,
    isLoading: isLoadingStats, 
    error: statsError 
  } = useQuery({
    queryKey: ['stats'],
    queryFn: getStats,
    retry: 1,
    refetchInterval: 30000, // Actualizar cada 30 segundos
  });

  // Manejar errores de autenticación
  useEffect(() => {
    if (partidosError || statsError) {
      const errorMsg = partidosError?.message || statsError?.message || '';
      if (errorMsg.includes('401') || errorMsg.includes('No autorizado')) {
        navigate('/login');
      }
    }
  }, [partidosError, statsError, navigate]);

  // Procesar datos para las gráficas
  const partidosConDatos = useMemo(() => {
    if (!partidos || !statsData?.totalPorPartido) return [];
    
    return partidos.map((partido: any, index: number) => {
      const partidoStats = statsData.totalPorPartido.find((p: any) => p.partidoId === partido._id);
      return {
        ...partido,
        votos: partidoStats?.cantidad || 0,
        color: PARTIDO_COLORS[index % PARTIDO_COLORS.length],
        tendencia: 'stable', // Por defecto
        variacion: 0
      };
    });
  }, [partidos, statsData]);

  const totalVotos = statsData?.total || 0;
  
  // Datos para las gráficas
  const chartData = useMemo(() => ({
    labels: partidosConDatos.map((p: any) => p.nombre),
    datasets: [
      {
        label: 'Votos por partido',
        data: partidosConDatos.map((p: any) => {
          const total = totalVotos > 0 ? Math.round((p.votos / totalVotos) * 100) : 0;
          return total;
        }),
        backgroundColor: partidosConDatos.map((p: any) => p.color),
        borderColor: partidosConDatos.map((p: any) => p.color),
        borderWidth: 1,
      },
    ],
  }), [partidosConDatos, totalVotos]);

  if (isLoadingPartidos || isLoadingStats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Cargando datos...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Resultados Electorales</h1>
          <p className="text-muted-foreground">
            Última actualización: {new Date().toLocaleString()}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => window.print()}>
            <Download className="h-4 w-4 mr-2" />
            Exportar PDF
          </Button>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualizar
          </Button>
        </div>
      </div>

      {/* Podio de los 3 primeros */}
      {partidosConDatos.length > 0 && (
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-6 mb-8">
          {partidosConDatos
            .slice(0, 3)
            .map((partido: any, idx: number) => {
              const porcentaje = totalVotos > 0 ? Math.round((partido.votos / totalVotos) * 100) : 0;
              const medallas = ['🥇', '🥈', '🥉'];
              return (
                <div
                  key={partido._id}
                  className={`flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl px-8 py-5 min-w-[180px] max-w-[220px] border-2 ${idx === 0 ? 'border-yellow-400' : idx === 1 ? 'border-gray-400' : 'border-amber-700'} relative`}
                  style={{ zIndex: 10 }}
                >
                  <span className="text-3xl absolute -top-6 left-1/2 -translate-x-1/2" style={{ filter: idx === 0 ? 'drop-shadow(0 2px 6px #facc15)' : undefined }}>{medallas[idx]}</span>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full mb-2" style={{ background: partido.color, color: '#fff', fontWeight: 700, fontSize: 20 }}>{partido.sigla}</span>
                  <span className="font-bold text-center mb-1" style={{ color: partido.color }}>{partido.nombre}</span>
                  <span className="text-lg font-bold text-gray-800">{porcentaje}%</span>
                  <span className="text-xs text-gray-500">{partido.votos} votos</span>
                </div>
              );
            })}
        </div>
      )}

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-card p-8 rounded-2xl shadow-2xl flex flex-col items-center justify-center" style={{ background: 'linear-gradient(135deg, #f8fafc 70%, #e0e7ff 100%)' }}>
          <h3 className="text-2xl font-bold mb-2">Resultados por Partido</h3>
          <p className="mb-4 text-gray-500 text-base">Total de votos: <span className="font-bold text-blue-700">{totalVotos}</span></p>
          <div className="h-80 w-full flex items-center justify-center max-w-2xl mx-auto">
            {partidosConDatos.length > 0 ? (
              <Bar data={chartData} options={chartOptions} plugins={[ChartDataLabels]} />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p>No hay datos disponibles</p>
              </div>
            )}
          </div>
          {/* Leyenda custom */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {partidosConDatos.map((partido: any) => (
              <div key={partido._id} className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full" style={{ background: partido.color }} />
                <span className="text-xs font-bold uppercase" style={{ color: partido.color }}>{partido.sigla}</span>
                <span className="text-xs text-gray-700">{partido.nombre}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Distribución de Votos</h3>
          {partidosConDatos.length > 0 ? (
            <div className="space-y-4">
              {partidosConDatos
                .sort((a: { votos: number }, b: { votos: number }) => b.votos - a.votos)
                .map((partido: any, idx: number) => {
                  const porcentaje = totalVotos > 0 ? Math.round((partido.votos / totalVotos) * 100) : 0;
                  const esGanador = idx === 0 && porcentaje > 0;
                  return (
                    <div
                      key={partido._id}
                      className={`flex justify-between items-center p-2 rounded-lg transition ${esGanador ? "bg-gradient-to-r from-yellow-200/80 to-yellow-50 shadow-lg border-2 border-yellow-400" : ""} hover:bg-gray-50`}
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className="inline-flex items-center justify-center rounded-full font-bold uppercase"
                          style={{
                            background: partido.color,
                            color: "#fff",
                            width: 32,
                            height: 32,
                            minWidth: 32,
                            minHeight: 32,
                            fontSize: "1rem",
                            boxShadow: esGanador ? "0 0 0 2px #facc15" : undefined,
                          }}
                          title={partido.nombre}
                        >
                          {partido.sigla}
                        </span>
                        <span className={`ml-2 ${esGanador ? "font-extrabold text-lg" : "font-medium"}`}>{partido.nombre}</span>
                      </div>
                      <div className={`flex items-center gap-2 ${esGanador ? "font-bold text-lg" : ""}`}>
                        <span>{porcentaje}%</span>
                        {esGanador && (
                          <span className="ml-1 text-yellow-500 font-bold animate-bounce" title="Ganador">★</span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p>No hay datos de partidos disponibles</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultadosPage;
