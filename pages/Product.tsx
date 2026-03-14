import React from 'react';
import { motion } from 'framer-motion';
import { Map, Brain, Compass, Target } from 'lucide-react';

export default function Product() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-text-prim">
          The Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-dawn to-phoenix">Intelligence</span> Platform
        </h1>
        <p className="text-xl text-text-sec max-w-3xl mx-auto leading-relaxed font-body">
          Remiro is not a collection of career tools. It is a career intelligence system.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-3xl font-heading font-bold text-text-prim">A Structured Understanding</h2>
          <p className="text-text-sec text-lg leading-relaxed font-body">
            The platform builds a structured understanding of your professional identity, skills and capabilities, career goals, market demand, and future opportunities.
          </p>
          <p className="text-text-sec text-lg leading-relaxed font-body">
            This allows Remiro to generate strategic career guidance that evolves over time.
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-8 rounded-3xl relative overflow-hidden shadow-sm"
        >
          <div className="relative z-10 space-y-6">
            {[
              { icon: <Brain />, text: "Professional Identity" },
              { icon: <Target />, text: "Skills & Capabilities" },
              { icon: <Compass />, text: "Career Goals" },
              { icon: <Map />, text: "Market Demand" }
            ].map((item, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 bg-white/60 rounded-2xl border border-white/40 shadow-sm">
                <div className="text-phoenix">{item.icon}</div>
                <span className="text-text-prim font-bold font-body">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel p-12 rounded-3xl text-center relative overflow-hidden shadow-md"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dawn to-phoenix"></div>
        <h2 className="text-4xl font-heading font-bold text-text-prim mb-8">Career Navigation</h2>
        <p className="text-xl text-text-sec max-w-3xl mx-auto mb-12 font-body">
          Imagine navigating a city without Google Maps. That is how most professionals navigate their careers. Remiro provides the same type of intelligence for career navigation.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="p-6 bg-white/60 rounded-2xl border border-white/40 shadow-sm">
            <div className="text-2xl font-bold text-text-prim mb-2 font-heading">Google Maps</div>
            <div className="text-text-sec font-body">Navigation for roads</div>
          </div>
          <div className="p-6 bg-white/60 rounded-2xl border border-white/40 shadow-sm">
            <div className="text-2xl font-bold text-text-prim mb-2 font-heading">Bloomberg</div>
            <div className="text-text-sec font-body">Intelligence for finance</div>
          </div>
          <div className="p-6 bg-phoenix/5 rounded-2xl border border-phoenix/20 relative overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-phoenix/10 to-transparent"></div>
            <div className="relative z-10">
              <div className="text-2xl font-bold text-text-prim mb-2 font-heading">Remiro</div>
              <div className="text-dawn font-bold font-body">Intelligence for careers</div>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
