const API_URL = "http://localhost:3000"; // Cambia esto si despliegas en la nube

// Obtener provincias
export const getProvincias = async (): Promise<any[]> => {
  const response = await fetch(`${API_URL}/ubicaciones/provincias`);
  if (!response.ok) {
    throw new Error('Error al obtener la lista de provincias');
  }
  return response.json();
};

// Obtener partidos
export const getPartidos = async (): Promise<any> => {
  const response = await fetch(`${API_URL}/partidos`);
  if (!response.ok) {
    throw new Error('Error al obtener la lista de partidos');
  }
  return response.json();
};

export async function getVotos(params: { provincia?: string; localidad?: string; partidoId?: string } = {}) {
  const query = new URLSearchParams(params as any).toString();
  const res = await fetch(`${API_URL}/votos?${query}`);
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Error al obtener votos");
  }
  
  return res.json();
}

export async function postVoto(data: { mesa: string; provincia: string; localidad: string; partidoSigla: string; cantidad: number }) {
  console.log('Enviando voto:', data);
  
  try {
    const res = await fetch(`${API_URL}/votos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    console.log('Respuesta del servidor:', res.status, res.statusText);

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Error en la respuesta:', errorText);
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        throw new Error(`Error al registrar voto: ${res.status} ${res.statusText}`);
      }
      throw new Error(errorData.message || `Error al registrar voto: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error en postVoto:', error);
    throw error;
  }
}

export async function getStats() {
  console.log('🔍 [API] Obteniendo estadísticas de', `${API_URL}/votos/stats/totales`);
  const res = await fetch(`${API_URL}/votos/stats/totales`);
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error('❌ [API] Error al obtener estadísticas:', res.status, errorText);
    let errorData;
    try {
      errorData = JSON.parse(errorText);
    } catch (e) {
      throw new Error(`Error al obtener estadísticas: ${res.status} ${res.statusText}`);
    }
    throw new Error(errorData.message || `Error al obtener estadísticas: ${res.status} ${res.statusText}`);
  }
  
  const data = await res.json();
  console.log('✅ [API] Estadísticas obtenidas:', data);
  return data;
}
