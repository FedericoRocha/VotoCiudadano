import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { Button } from './button';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Efecto para manejar el scroll
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const routes = [
    { name: 'Inicio', path: '/' },
    { name: 'Votar', path: '/votar' },
    { name: 'Resultados', path: '/resultados' },
    { name: 'Acerca de', path: '/acerca-de' },
  ];
  
  // Tema fijo en claro
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={cn(
      'sticky top-0 z-50 bg-white border-b border-gray-200',
      scrolled ? 'shadow-sm' : ''
    )}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-xl font-bold text-blue-600">
                VotoCiudadano.ar
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:ml-12 md:flex md:space-x-1">
              {routes.map((route) => (
                <div key={route.path} className="relative">
                  <Link
                    to={route.path}
                    className={cn(
                      'relative px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-md mx-1',
                      isActive(route.path)
                        ? 'text-arg-blue-dark font-semibold'
                        : 'text-gray-700 hover:text-arg-blue hover:bg-arg-blue/5'
                    )}
                  >
                    {route.name}
                    {isActive(route.path) && (
                      <motion.span 
                        className="absolute bottom-0 left-0 w-full h-1 bg-arg-gold rounded-t-full"
                        layoutId="activeIndicator"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                          duration: 0.25
                        }}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                asChild
              >
                <Link to="/votar">
                  Votar ahora
                </Link>
              </Button>
              <Button 
                size="sm"
                className="bg-blue-600 text-white hover:bg-blue-700"
                asChild
              >
                <Link to="/resultados">
                  Ver resultados
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                className="text-arg-blue hover:bg-arg-blue/10"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: mobileMenuOpen ? 1 : 0,
          height: mobileMenuOpen ? 'auto' : 0,
        }}
        className="md:hidden overflow-hidden bg-white shadow-lg rounded-b-lg mx-2"
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={cn(
                'block px-4 py-3 rounded-lg text-base font-medium transition-colors',
                isActive(route.path)
                  ? 'bg-arg-blue/10 text-arg-blue-dark font-semibold'
                  : 'text-gray-700 hover:bg-arg-blue/5 hover:text-arg-blue'
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {route.name}
              {isActive(route.path) && (
                <span className="ml-2 inline-block w-2 h-2 rounded-full bg-arg-gold"></span>
              )}
            </Link>
          ))}
          <div className="pt-2 mt-2 border-t border-gray-100">
            <Link
              to="/votar"
              className="block w-full px-4 py-3 text-center text-sm font-medium text-arg-blue-dark bg-arg-blue/5 rounded-lg hover:bg-arg-blue/10 transition-colors mb-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Votar ahora
            </Link>
            <Link
              to="/resultados"
              className="block w-full px-4 py-3 text-center text-sm font-medium text-white bg-gradient-to-r from-arg-blue to-arg-blue-dark rounded-lg hover:opacity-90 transition-opacity"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ver resultados
            </Link>
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;
