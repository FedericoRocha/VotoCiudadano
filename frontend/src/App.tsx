import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider, ToastViewport } from './components/ui/toaster';
import { ThemeProvider } from './context/theme-provider';
import Navbar from './components/ui/navbar';
import Footer from './components/ui/footer';
import HomePage from './pages/home';
import VotarPage from './pages/votar';
import ResultadosPage from './pages/resultados';
import AcercaDePage from './pages/acerca-de';
import NotFoundPage from './pages/not-found';

// Configuración de React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <ToastProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow bg-background text-foreground">
                <div className="container mx-auto px-4 py-8">
                  <div className="max-w-7xl mx-auto">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/votar" element={<VotarPage />} />
                      <Route path="/resultados" element={<ResultadosPage />} />
                      <Route path="/acerca-de" element={<AcercaDePage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </div>
                </div>
              </main>
              <Footer />
              <ToastViewport />
            </div>
          </Router>
        </ToastProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
