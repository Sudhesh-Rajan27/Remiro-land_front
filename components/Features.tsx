import React from 'react';
import { Fingerprint, Compass, Zap, Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const featuresList = [
  {
    icon: <Fingerprint className="w-6 h-6 text-phoenix" />,
    title: "Identity Architect",
    description: "Analyzes personality traits, professional strengths, and constraints to build your foundational profile.",
    link: "/agents#identity"
  },
  {
    icon: <Compass className="w-6 h-6 text-dawn" />,
    title: "Strategy Director",
    description: "Designs realistic, multi-year career strategies with concrete milestones and risk assessment.",
    link: "/agents#strategy"
  },
  {
    icon: <Zap className="w-6 h-6 text-dusty" />,
    title: "Growth Engineer",
    description: "Performs granular skill-gap analysis and constructs adaptive learning roadmaps.",
    link: "/agents#growth"
  },
  {
    icon: <Briefcase className="w-6 h-6 text-phoenix" />,
    title: "Chief Marketing Officer",
    description: "Your personal branding expert for resume optimization, portfolio review, and LinkedIn presence.",
    link: "/agents#marketing"
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

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col md:flex-row justify-between items-end mb-16 relative"
        >
          <div className="max-w-xl">
            <motion.span variants={itemVariants} className="text-phoenix font-body font-bold text-xs tracking-[0.2em] uppercase mb-4 block">
              The Neural Grid
            </motion.span>
            <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-heading font-bold mb-6 text-text-prim leading-tight">
              Six specialized agents working in <span className="text-transparent bg-clip-text bg-gradient-to-r from-phoenix to-dawn italic">concert.</span>
            </motion.h2>
            <motion.p variants={itemVariants} className="text-text-sec text-lg md:text-xl font-body font-light leading-relaxed">
              Stop relying on generic advice. Our specialized AI agents analyze, strategize, and execute your career advancement.
            </motion.p>
          </div>
          
          <motion.div variants={itemVariants}>
            <Link to="/agents" className="hidden md:flex items-center gap-2 px-8 py-4 rounded-full border border-black/10 hover:border-phoenix/30 text-text-prim hover:text-phoenix bg-white/50 hover:bg-white transition-all font-body font-bold text-sm tracking-wide shadow-sm hover:shadow-md">
              <span>View Agent Roster</span>
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 relative"
        >
          {featuresList.map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants} className="h-full">
              <Link to={feature.link} className="block h-full group">
                <div className="h-full bg-white/60 backdrop-blur-xl border border-black/5 rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(214,90,90,0.08)] hover:border-phoenix/20 hover:bg-white relative overflow-hidden">
                  
                  {/* Subtle gradient hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-phoenix/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10 flex flex-col sm:flex-row items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-black/5 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-md transition-all duration-500">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-text-prim mb-3 group-hover:text-phoenix transition-colors flex items-center gap-2">
                        {feature.title}
                        <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </h3>
                      <p className="text-text-sec leading-relaxed font-body text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-8 md:hidden flex justify-center">
          <Link to="/agents" className="flex items-center gap-2 px-8 py-4 rounded-full border border-black/10 text-text-prim bg-white/50 font-body font-bold text-sm tracking-wide shadow-sm">
            <span>View Agent Roster</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Features;