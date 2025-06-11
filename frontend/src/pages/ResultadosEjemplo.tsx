import { usePartidos } from "../hooks/usePartidos";
import { useVotos } from "../hooks/useVotos";
import { useStats } from "../hooks/useStats";

export function ResultadosEjemplo() {
  const { data: partidos, isLoading: loadingPartidos, error: errorPartidos } = usePartidos();
  const { data: votos, isLoading: loadingVotos, error: errorVotos } = useVotos({ provincia: "Buenos Aires" });
  const { data: stats, isLoading: loadingStats, error: errorStats } = useStats();

  if (loadingPartidos || loadingVotos || loadingStats) return <div>Cargando...</div>;
  if (errorPartidos || errorVotos || errorStats) return <div>Error al cargar datos</div>;

  return (
    <div>
      <h2>Partidos</h2>
      <ul>
        {partidos?.map((p: any) => (
          <li key={p.id}>{p.nombre} ({p.sigla})</li>
        ))}
      </ul>
      <h2>Votos</h2>
      <pre>{JSON.stringify(votos, null, 2)}</pre>
      <h2>Estadísticas</h2>
      <pre>{JSON.stringify(stats, null, 2)}</pre>
    </div>
  );
}

