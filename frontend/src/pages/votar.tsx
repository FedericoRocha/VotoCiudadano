"use client";

import { VotingForm } from "../components/voting/VotingForm";
import { motion } from "framer-motion";
import { Check, Shield, Lock, BarChart2 } from "lucide-react";

export default function VotarPage() {
  const features = [
    {
      icon: <Lock className="h-6 w-6 text-blue-600" />,
      title: "100% Anónimo",
      description: "Tu privacidad está garantizada. No guardamos información personal."
    },
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      title: "Seguro",
      description: "Utilizamos tecnología de encriptación para proteger tu voto."
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-purple-600" />,
      title: "Impacto Real",
      description: "Ayuda a crear una visión más clara de las elecciones en tiempo real."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Tu Voto Cuenta
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Registra tu voto de forma anónima y ayuda a construir una visión más clara de las elecciones.
            </motion.p>
            
            {/* Features Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {features.map((feature, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transition-all hover:bg-white/20">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-blue-100 text-sm">{feature.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-16 -mt-12 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="p-1 bg-gradient-to-r from-blue-500 to-purple-600">
              <div className="bg-white p-8 rounded-t-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Registro de Voto</h2>
                    <p className="text-gray-600 mt-1">Completa los siguientes campos para registrar tu voto</p>
                  </div>
                  <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600">
                    <Check className="h-8 w-8" />
                  </div>
                </div>
                
                {/* Formulario de registro de voto */}
                <VotingForm />
              </div>
            </div>
          </div>
          
          {/* Información adicional */}
          <div className="mt-12 text-center text-gray-600 max-w-3xl mx-auto">
            <p className="text-sm">
              <span className="font-medium">Importante:</span> Este formulario es completamente anónimo. 
              No se almacena ninguna información personal que pueda identificarte.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
