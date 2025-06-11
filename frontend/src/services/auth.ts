// Clave para almacenar en localStorage si el usuario ya votó
const VOTED_KEY = 'hasVoted';

// Verifica si el usuario ya votó desde este dispositivo
export const hasUserVoted = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(VOTED_KEY) === 'true';
};

// Marca que el usuario ya votó
export const markAsVoted = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(VOTED_KEY, 'true');
  }
};

// Resetea el estado de voto (útil para pruebas)
export const resetVoteStatus = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(VOTED_KEY);
  }
};
