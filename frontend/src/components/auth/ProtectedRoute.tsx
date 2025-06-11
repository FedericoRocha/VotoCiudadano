import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { hasUserVoted } from '../../services/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({ 
  children, 
  redirectTo = '/resultados' 
}: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const hasVoted = hasUserVoted();

  useEffect(() => {
    if (!hasVoted) {
      console.log('El usuario no ha votado, redirigiendo al formulario...');
      navigate(redirectTo, { replace: true });
    }
  }, [hasVoted, navigate, redirectTo]);

  // Si el usuario ya votó, mostrar el contenido protegido
  // De lo contrario, no renderizar nada (se redirigirá)
  return hasVoted ? <>{children}</> : null;
};

export default ProtectedRoute;
