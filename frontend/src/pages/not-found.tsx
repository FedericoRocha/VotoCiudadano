import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Página no encontrada</h2>
        <p className="text-muted-foreground mb-8">
          Lo sentimos, no pudimos encontrar la página que estás buscando.
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="px-6"
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  );
}
