import { motion } from 'framer-motion';
import { Check, MapPin, CheckCircle, BarChart2 } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'Selecciona tu ubicación',
    description: 'Indica tu provincia y localidad para ayudar a segmentar los resultados.',
    icon: MapPin,
  },
  {
    id: '02',
    title: 'Elige tu opción de voto',
    description: 'Selecciona entre las diferentes opciones disponibles en tu distrito.',
    icon: CheckCircle,
  },
  {
    id: '03',
    title: 'Confirma tu elección',
    description: 'Revisa tu selección y confirma para registrar tu voto de forma anónima.',
    icon: Check,
  },
  {
    id: '04',
    title: '¡Listo!',
    description: 'Tu voto ha sido registrado y se reflejará en las estadísticas en tiempo real.',
    icon: BarChart2,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    } 
  },
};

export const HowItWorks = () => {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">¿Cómo funciona?</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Registra tu voto en simples pasos
          </p>
        </motion.div>

        <motion.div 
          className="relative"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {/* Timeline */}
          <div className="hidden md:block absolute top-0 left-1/2 h-full w-0.5 bg-gradient-to-b from-blue-100 via-blue-400 to-blue-100"></div>
          
          {/* Steps */}
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div 
                  key={step.id} 
                  className="relative group"
                  variants={item}
                >
                  <div className={`md:flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                            {step.id}
                          </div>
                          <h3 className="ml-4 text-lg font-semibold text-gray-900">
                            {step.title}
                          </h3>
                        </div>
                        <p className="mt-2 text-gray-600">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className={`hidden md:block md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                      <div className="flex items-center justify-center h-full">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600">
                          <Icon className="w-8 h-8" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
