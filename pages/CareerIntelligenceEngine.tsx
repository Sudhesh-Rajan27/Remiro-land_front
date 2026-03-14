import React from 'react';
import { motion } from 'framer-motion';
import { Network, Database, Brain, Activity, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CareerIntelligenceEngine() {
  const components = [
    {
      icon: <Network className="w-6 h-6" />,
      title: "Career Graph",
      description: "Maps the relationships between your current position, potential paths, and required transitions."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Skills Intelligence Map",
      description: "A dynamic taxonomy of your capabilities, weighted by market relevance and proficiency."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Professional Identity Model",
      description: "A structured representation of your values, constraints, and long-term aspirations."
    },
    {
      icon: <Compass className="w-6 h-6" />,
      title: "Learning Roadmap Engine",
      description: "Generates optimized learning paths to bridge capability gaps efficiently."
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Market Signal Analysis",
      description: "Continuously processes industry trends to ensure your strategy remains relevant."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen relative">
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-24 relative z-10"
      >
        <span className="text-phoenix font-body font-bold text-xs tracking-[0.2em] uppercase mb-4 block">
          Core Architecture
        </span>
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-text-prim">
          The Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-dawn to-phoenix italic">Brain</span>
        </h1>
        <p className="text-lg md:text-xl text-text-sec max-w-3xl mx-auto leading-relaxed font-body font-light">
          Remiro constructs a dynamic career intelligence model for each user. Together these systems form the Career Brain that powers Remiro.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/60 backdrop-blur-xl border border-black/5 rounded-[2.5rem] p-10 relative overflow-hidden h-full flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-phoenix/5 to-transparent opacity-50"></div>
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 border border-phoenix/20 bg-phoenix/5 rounded-full px-4 py-1.5 mb-8">
              <Activity className="w-4 h-4 text-phoenix" />
              <span className="text-xs font-bold tracking-widest uppercase text-phoenix">Live System</span>
            </div>
            <h2 className="text-4xl font-heading font-bold text-text-prim mb-6">Continuous Intelligence</h2>
            <p className="text-text-sec text-lg leading-relaxed mb-10 font-body">
              The Career Intelligence Engine is not a static database. It is a living model that evolves with every interaction, learning from your successes, challenges, and shifting goals.
            </p>
            <div className="w-full h-64 rounded-3xl border border-black/5 bg-white/50 relative overflow-hidden flex items-center justify-center shadow-inner">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#D65A5A10_1px,transparent_1px),linear-gradient(to_bottom,#D65A5A10_1px,transparent_1px)] bg-[size:24px_24px] opacity-50"></div>
              <Brain className="w-24 h-24 text-phoenix/40 relative z-10 animate-pulse" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4"
        >
          {components.map((component, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="block group"
            >
              <div className="bg-white/60 backdrop-blur-xl border border-black/5 p-6 rounded-[2rem] flex items-center gap-6 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(214,90,90,0.06)] hover:border-phoenix/20 hover:bg-white transition-all duration-500 relative overflow-hidden cursor-default">
                
                <div className="absolute inset-0 bg-gradient-to-r from-phoenix/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="w-14 h-14 rounded-2xl bg-white border border-black/5 shadow-sm flex items-center justify-center text-dawn group-hover:text-phoenix group-hover:scale-110 group-hover:shadow-md transition-all duration-500 shrink-0 relative z-10">
                  {component.icon}
                </div>
                <div className="relative z-10 flex-1">
                  <h3 className="text-xl font-heading font-bold text-text-prim mb-1 group-hover:text-phoenix transition-colors">{component.title}</h3>
                  <p className="text-text-sec leading-relaxed text-sm font-body">{component.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
