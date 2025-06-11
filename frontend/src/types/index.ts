// Tipos básicos para la aplicación

export interface Coordenadas {
  lat: number;
  lng: number;
}

export interface ReporteMesa {
  motivo: string;
  fecha: Date;
}

// Entidades principales
export interface Voto {
  id: string;
  mesaId: string;
  partido: string;
  timestamp: Date;
  comentario?: string;
  fotoURL?: string;
  hashDispositivo: string;
  geolocalizacion?: Coordenadas;
}

export interface Mesa {
  id: string;
  provincia: string;
  localidad: string;
  escuela: string;
  numeroMesa: string;
  votos: string[]; // IDs de votos
  creacionUsuario: boolean;
  reportes?: ReporteMesa[];
}

export interface PartidoPolitico {
  id: string;
  nombre: string;
  logo: string;
  color: string;
}

export interface Provincia {
  id: string;
  nombre: string;
}

export interface Localidad {
  id: string;
  nombre: string;
  provinciaId: string;
}

export interface Escuela {
  id: string;
  nombre: string;
  direccion: string;
  localidadId: string;
  coordenadas?: Coordenadas;
}

// Tipos para los formularios
export interface FormularioVoto {
  provincia: string;
  localidad: string;
  escuela: string;
  numeroMesa: string;
  partido: string;
  comentario?: string;
  foto?: File;
}

// Tipos para la API
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Tipos para el estado global
export interface AppState {
  provinciaSeleccionada: string | null;
  localidadSeleccionada: string | null;
  escuelaSeleccionada: string | null;
  mesaSeleccionada: string | null;
  partidos: PartidoPolitico[];
  provincias: Provincia[];
  localidades: Localidad[];
  escuelas: Escuela[];
  mesas: Mesa[];
  loading: boolean;
  error: string | null;
}

// Tipos para los filtros
export interface FiltrosBusqueda {
  provincia?: string;
  localidad?: string;
  escuela?: string;
  partido?: string;
  fechaInicio?: Date;
  fechaFin?: Date;
}

// Tipos para estadísticas
export interface EstadisticasVoto {
  partido: string;
  cantidad: number;
  porcentaje: number;
  color: string;
}
