import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Map, Zap, Megaphone, Target, Layers, ArrowRight } from 'lucide-react';

export default function AIAgents() {
  const agents = [
    {
      id: "identity",
      icon: <UserCircle className="w-6 h-6" />,
      name: "Identity Architect",
      description: "Builds the foundational model of your professional identity. Analyzes strengths, motivations, and constraints.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: "strategy",
      icon: <Map className="w-6 h-6" />,
      name: "Strategy Director",
      description: "Designs long-term career strategies. Produces career roadmaps and transition plans.",
      color: "from-purple-500 to-pink-400"
    },
    {
      id: "growth",
      icon: <Zap className="w-6 h-6" />,
      name: "Growth Engineer",
      description: "Performs deep skill intelligence analysis. Identifies capability gaps and learning priorities.",
      color: "from-green-500 to-emerald-400"
    },
    {
      id: "marketing",
      icon: <Megaphone className="w-6 h-6" />,
      name: "Chief Marketing Officer",
      description: "Optimizes professional branding. Improves resumes, portfolios, and LinkedIn presence.",
      color: "from-orange-500 to-yellow-400"
    },
    {
      id: "interview",
      icon: <Target className="w-6 h-6" />,
      name: "Interview Strategist",
      description: "Simulates hiring scenarios and evaluates answers.",
      color: "from-red-500 to-rose-400"
    },
    {
      id: "synthesizer",
      icon: <Layers className="w-6 h-6" />,
      name: "Response Synthesizer",
      description: "Combines insights from all agents into coherent guidance.",
      color: "from-indigo-500 to-blue-400"
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <main className="pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto min-h-screen relative">
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-24 relative z-10"
      >
        <span className="text-phoenix font-body font-bold text-xs tracking-[0.2em] uppercase mb-4 block">
          Agent Roster
        </span>
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-text-prim">
          Multi-Agent <span className="text-transparent bg-clip-text bg-gradient-to-r from-dawn to-phoenix italic">Intelligence</span>
        </h1>
        <p className="text-lg md:text-xl text-text-sec max-w-3xl mx-auto leading-relaxed font-body font-light">
          Remiro operates through a network of specialized AI agents. Each agent focuses on a specific dimension of career intelligence.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10"
      >
        {agents.map((agent, index) => (
          <motion.div 
            key={index}
            id={agent.id}
            variants={itemVariants}
            className="h-full"
          >
            <div className="h-full bg-white/60 backdrop-blur-xl border border-black/5 rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(214,90,90,0.08)] hover:border-phoenix/20 hover:bg-white relative overflow-hidden group cursor-default">
              
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${agent.color} opacity-70 group-hover:opacity-100 transition-opacity`}></div>
              
              {/* Subtle gradient hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-phoenix/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white border border-black/5 shadow-sm flex items-center justify-center text-text-prim group-hover:text-phoenix group-hover:scale-110 group-hover:shadow-md transition-all duration-500 mb-6">
                  {agent.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold text-text-prim mb-3 group-hover:text-phoenix transition-colors">{agent.name}</h3>
                <p className="text-text-sec leading-relaxed font-body text-base">{agent.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
