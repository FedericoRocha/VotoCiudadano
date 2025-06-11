import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { ArrowRight, BarChart2, Shield, Users, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'Totalmente anónimo',
      description: 'No almacenamos información personal que pueda identificarte.'
    },
    {
      icon: BarChart2,
      title: 'Datos en tiempo real',
      description: 'Visualiza las tendencias actualizadas al instante.'
    },
    {
      icon: Users,
      title: 'Participación ciudadana',
      description: 'Contribuye a crear una visión más clara de las preferencias electorales.'
    }
  ];

  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="grid md:grid-cols-2">
            {/* Left column */}
            <div className="p-8 sm:p-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Sobre VotoCiudadano.ar
                </h2>
                <div className="mt-2 h-1 w-20 bg-blue-600"></div>
                
                <p className="mt-6 text-lg text-gray-600">
                  VotoCiudadano.ar es una plataforma independiente y sin fines de lucro que busca fomentar 
                  la participación ciudadana en el proceso democrático a través de la tecnología.
                </p>
                
                <ul className="mt-8 space-y-4">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 text-blue-600">
                            <Icon className="h-4 w-4" />
                          </div>
                        </div>
                        <p className="ml-3 text-base text-gray-700">
                          <span className="font-medium">{feature.title}:</span> {feature.description}
                        </p>
                      </li>
                    );
                  })}
                </ul>
                
                <div className="mt-10">
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/acerca-de" className="flex items-center">
                      Conocer más <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
            
            {/* Right column */}
            <div className="bg-gray-50 p-8 sm:p-12 border-t border-gray-200 md:border-t-0 md:border-l">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="h-full flex flex-col"
              >
                <h3 className="text-lg font-medium text-gray-900">Importante</h3>
                <div className="mt-2 h-1 w-12 bg-blue-600"></div>
                
                <div className="mt-6 flex-1">
                  <div className="p-6 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Check className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-blue-800">Plataforma no oficial</h4>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>
                            Esta plataforma no está afiliada a ningún organismo electoral oficial. 
                            Los datos mostrados son proporcionados por los usuarios de manera voluntaria 
                            y anónima, y tienen únicamente fines informativos y de análisis de tendencias.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h4 className="text-sm font-medium text-gray-900">¿Tienes preguntas?</h4>
                    <p className="mt-2 text-sm text-gray-600">
                      Consulta nuestra sección de <a href="/preguntas-frecuentes" className="font-medium text-blue-600 hover:text-blue-500">preguntas frecuentes</a> o <a href="/contacto" className="font-medium text-blue-600 hover:text-blue-500">contáctanos</a>.
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Link to="/resultados" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500">
                    Ver resultados en tiempo real <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
