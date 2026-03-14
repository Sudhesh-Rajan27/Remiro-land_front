import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Cpu, Network, Layers, TrendingUp } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Query Understanding",
      description: "The user interacts through chat. Remiro analyzes the intent of the request.",
      number: "01"
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: "Agent Activation",
      description: "Relevant AI agents activate depending on the problem being solved. Examples: career transition, skill development, resume optimization, interview preparation.",
      number: "02"
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Intelligence Processing",
      description: "Each agent analyzes the request using its domain expertise.",
      number: "03"
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Response Synthesis",
      description: "The system merges outputs from multiple agents into a single strategic response.",
      number: "04"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Career Profile Evolution",
      description: "Each interaction updates the structured career profile. The system becomes more intelligent over time.",
      number: "05"
    }
  ];

  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen relative">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-24 relative z-10"
      >
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-text-prim">
          How <span className="text-transparent bg-clip-text bg-gradient-to-r from-dawn to-phoenix">Remiro</span> Works
        </h1>
        <p className="text-xl text-text-sec max-w-3xl mx-auto leading-relaxed font-body">
          A five-step cognitive process that transforms conversation into strategic career intelligence.
        </p>
      </motion.div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Connecting Line */}
        <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-phoenix/50 via-dawn/20 to-transparent -translate-x-1/2 hidden md:block"></div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Content */}
              <div className={`flex-1 w-full glass-panel p-8 rounded-3xl relative overflow-hidden group hover:border-phoenix/30 transition-colors shadow-sm ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-dawn to-phoenix opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-phoenix/20 text-6xl font-heading font-bold absolute -top-4 -right-4 select-none">
                  {step.number}
                </div>
                <h3 className="text-2xl font-heading font-bold text-text-prim mb-4 relative z-10">{step.title}</h3>
                <p className="text-text-sec leading-relaxed relative z-10 font-body">{step.description}</p>
              </div>

              {/* Center Node */}
              <div className="hidden md:flex w-20 h-20 rounded-full bg-white/60 backdrop-blur-md border-2 border-phoenix/50 items-center justify-center relative z-10 shadow-[0_0_30px_rgba(214,90,90,0.1)]">
                <div className="text-dawn">{step.icon}</div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block flex-1"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
