import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Route, Target, Users, Briefcase, Zap } from 'lucide-react';

export default function Features() {
  const featuresList = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Resume Intelligence",
      description: "Dynamically tailored resumes that highlight the most relevant skills and experiences for specific roles."
    },
    {
      icon: <Route className="w-6 h-6" />,
      title: "Career Path Generation",
      description: "Data-driven roadmaps visualizing potential trajectories and the steps required to achieve them."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Skill Gap Mapping",
      description: "Precise identification of missing capabilities and targeted recommendations for acquisition."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Interview Preparation",
      description: "Simulated behavioral and technical interviews with real-time feedback and evaluation."
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Personal Branding",
      description: "Optimization of digital presence, including LinkedIn profiles and professional portfolios."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Application Optimization",
      description: "Strategic guidance on application timing, networking approaches, and follow-up communications."
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
          Platform Features
        </span>
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-text-prim">
          Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-dawn to-phoenix italic">Capabilities</span>
        </h1>
        <p className="text-lg md:text-xl text-text-sec max-w-3xl mx-auto leading-relaxed font-body font-light">
          A comprehensive suite of intelligence tools designed to accelerate your professional trajectory.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 relative z-10"
      >
        {featuresList.map((feature, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="h-full"
          >
            <div className="h-full bg-white/60 backdrop-blur-xl border border-black/5 rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(214,90,90,0.08)] hover:border-phoenix/20 hover:bg-white relative overflow-hidden group cursor-default">
              
              {/* Subtle gradient hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-phoenix/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white border border-black/5 shadow-sm flex items-center justify-center text-dawn group-hover:text-phoenix group-hover:scale-110 group-hover:shadow-md transition-all duration-500 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-heading font-bold text-text-prim mb-3 group-hover:text-phoenix transition-colors">{feature.title}</h3>
                <p className="text-text-sec leading-relaxed font-body text-base">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
