import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Map, Navigation } from 'lucide-react';

export default function About() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen relative flex flex-col items-center justify-center">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 relative z-10"
      >
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-text-prim">
          The Long-Term <span className="text-transparent bg-clip-text bg-gradient-to-r from-dawn to-phoenix">Vision</span>
        </h1>
        <p className="text-xl text-text-sec max-w-3xl mx-auto leading-relaxed font-body">
          Careers are the most important long-term system in people's lives. Yet most people navigate them without structured intelligence.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center relative z-10 w-full max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-heading font-bold text-text-prim">Remiro exists to change that.</h2>
          <p className="text-text-sec text-lg leading-relaxed font-body">
            The goal is to help professionals navigate their careers with the same clarity that GPS provides for navigation.
          </p>
          <p className="text-text-sec text-lg leading-relaxed font-body">
            We believe that by building a structured model of a user's professional identity and using AI to guide their career decisions, we can unlock unprecedented potential and fulfillment.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-12 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center text-center h-full shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-phoenix/10 to-transparent opacity-50"></div>
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-white/60 flex items-center justify-center mb-8 border border-white/40 text-dawn relative shadow-sm">
              <div className="absolute inset-0 bg-neural-grid opacity-10 animate-spin-slow rounded-full"></div>
              <Compass className="w-12 h-12 relative z-10" />
            </div>
            <h3 className="text-2xl font-heading font-bold text-text-prim mb-4">Navigation for Careers</h3>
            <p className="text-text-sec leading-relaxed max-w-sm font-body">
              From chaos to clarity. From guessing to strategy. From fragmented tools to a unified intelligence system.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
