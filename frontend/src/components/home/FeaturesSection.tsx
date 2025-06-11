import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, BarChart3, ArrowRight } from 'lucide-react';

const features = [
  {
    name: 'Fácil de usar',
    description: 'Registra tu voto en pocos pasos con nuestra interfaz intuitiva y amigable.',
    icon: CheckCircle,
  },
  {
    name: 'Anónimo y seguro',
    description: 'Tu privacidad es nuestra prioridad. Votos completamente anónimos y seguros.',
    icon: ShieldCheck,
  },
  {
    name: 'Tendencias en tiempo real',
    description: 'Visualiza cómo evolucionan las preferencias electorales al instante.',
    icon: BarChart3,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export const FeaturesSection = () => {
  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Características</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Una mejor manera de entender las preferencias electorales
          </p>
        </motion.div>

        <motion.div 
          className="grid gap-10 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={feature.name}
                className="group relative p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
                variants={item}
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-100 opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600 text-white mb-4">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <button className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-transform duration-200">
                    Saber más <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
