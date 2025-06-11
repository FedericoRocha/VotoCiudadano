import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface FooterLink {
  name: string;
  href: string;
  icon?: LucideIcon;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks: FooterSection[] = [
    {
      title: 'Navegación',
      links: [
        { name: 'Inicio', href: '/' },
        { name: 'Votar', href: '/votar' },
        { name: 'Resultados', href: '/resultados' },
        { name: 'Acerca de', href: '/acerca-de' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { name: 'Términos de servicio', href: '/terminos' },
        { name: 'Política de privacidad', href: '/privacidad' },
        { name: 'Cookies', href: '/cookies' },
      ],
    },
    {
      title: 'Contacto',
      links: [
        { name: 'contacto@votociudadano.ar', href: 'mailto:contacto@votociudadano.ar', icon: Mail },
        { name: 'Twitter', href: 'https://twitter.com/votociudadano', icon: Twitter },
        { name: 'Facebook', href: 'https://facebook.com/votociudadano', icon: Facebook },
        { name: 'Instagram', href: 'https://instagram.com/votociudadano', icon: Instagram },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                VotoCiudadano
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-500">
              Plataforma colaborativa para el seguimiento de resultados electorales en tiempo real.
            </p>
            <div className="mt-6 flex space-x-4">
              {[Twitter, Facebook, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-gray-400 hover:text-gray-500"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href.startsWith('http') ? '#' : item.href}
                        target={item.href.startsWith('http') ? '_blank' : '_self'}
                        className="text-sm text-gray-500 hover:text-blue-600 flex items-center space-x-2"
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} VotoCiudadano.ar. Todos los derechos reservados.
            </p>
            <p className="mt-4 md:mt-0 text-xs text-gray-500">
              Esta plataforma no representa resultados oficiales. Los datos son colaborativos y anónimos.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
