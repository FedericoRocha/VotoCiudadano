import { motion } from 'framer-motion';
import { Users, Target, ShieldCheck, BarChart2, Mail, Lock, Eye, UserCheck, Sun, Globe } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Plataforma Ciudadana",
      description: "Una iniciativa independiente que empodera a los argentinos con información electoral en tiempo real."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Transparencia Electoral",
      description: "Promovemos la transparencia en los procesos electorales a través de datos abiertos y accesibles."
    },
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Privacidad Garantizada",
      description: "Tu privacidad es nuestra prioridad. No recopilamos información personal identificable."
    }
  ];

  const steps = [
    { icon: <UserCheck className="h-6 w-6" />, text: "Registra tu voto de forma anónima" },
    { icon: <Lock className="h-6 w-6" />, text: "Los datos se procesan de forma segura" },
    { icon: <BarChart2 className="h-6 w-6" />, text: "Visualiza tendencias en tiempo real" },
    { icon: <Eye className="h-6 w-6" />, text: "Accede a los resultados sin necesidad de registro" }
  ];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-[#e3f2fd] via-white to-[#fffde7]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 pointer-events-none select-none bg-gradient-to-r from-[#6ec6f1] via-transparent to-[#ffe082]" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center mb-4 px-4 py-2 rounded-full bg-[#e3f2fd] border border-[#b3e5fc] shadow-sm">
              <Sun className="h-5 w-5 text-[#ffd600] mr-2" />
              <span className="text-sm font-medium text-[#1976d2]">Plataforma Ciudadana Argentina</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#1976d2] via-[#64b5f6] to-[#ffd600] bg-clip-text text-transparent">
              Acerca de VotoCiudadano.ar
            </h1>
            <p className="text-xl text-[#1976d2]/90 max-w-3xl mx-auto">
              Una plataforma comprometida con la transparencia electoral y la participación ciudadana en Argentina.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl border border-[#b3e5fc] p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-lg bg-[#e3f2fd] flex items-center justify-center text-[#1976d2] mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#1976d2] mb-2">{feature.title}</h3>
              <p className="text-[#424242]">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cómo Funciona */}
      <div className="bg-[#e3f2fd] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1976d2] mb-4">¿Cómo Funciona?</h2>
            <p className="text-lg text-[#1976d2]/90">Participar es simple, seguro y accesible para todos los ciudadanos</p>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-[#1976d2] to-[#ffd600]" />
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative mb-8 pl-16"
              >
                <div className="absolute left-0 w-8 h-8 rounded-full bg-[#1976d2] text-white flex items-center justify-center">
                  {step.icon}
                </div>
                <p className="text-lg text-[#1976d2]">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Valores */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#e3f2fd] to-[#fffde7] rounded-2xl p-8 md:p-12 shadow-md">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="w-20 h-20 rounded-2xl bg-[#1976d2] text-white flex items-center justify-center mx-auto md:mx-0">
                    <Globe className="h-10 w-10" />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold text-[#1976d2] mb-4">Nuestro Compromiso</h3>
                  <p className="text-[#424242] mb-6">
                    En VotoCiudadano.ar nos comprometemos con la transparencia, la participación y la seguridad, asegurando que cada voz cuente y que los datos sean siempre anónimos y accesibles para todos.
                  </p>
                  <ul className="list-disc pl-6 text-[#1976d2] space-y-2">
                    <li>Transparencia y acceso abierto</li>
                    <li>Privacidad y anonimato</li>
                    <li>Innovación cívica</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contacto */}
      <div className="bg-gradient-to-t from-[#fffde7] to-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-4 px-4 py-2 rounded-full bg-[#fffde7] border border-[#ffe082] shadow-sm">
              <Mail className="h-5 w-5 text-[#ffd600] mr-2" />
              <span className="text-sm font-medium text-[#1976d2]">Contacto</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1976d2] mb-4">¿Tienes preguntas o comentarios?</h2>
            <p className="text-lg text-[#1976d2]/90 mb-6">
              No dudes en escribirnos a:
            </p>
            <a href="mailto:contacto@votociudadano.ar" className="inline-block px-6 py-3 rounded-lg bg-[#ffd600] text-[#1976d2] font-semibold shadow hover:bg-[#ffe082] transition-colors">
              contacto@votociudadano.ar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

