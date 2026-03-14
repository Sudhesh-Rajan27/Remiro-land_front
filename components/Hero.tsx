import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { HoloObject } from './HoloObject';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [displayedText, setDisplayedText] = useState("");

  const { scrollY } = useScroll();
  const translateY1 = useTransform(scrollY, [0, 1000], [0, -50]);
  const translateY2 = useTransform(scrollY, [0, 1000], [0, -100]);

  const fullText = "A neural system of specialized AI agents designed to construct and evolve your professional identity. Stop guessing your next move.";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center pt-32 pb-20 px-4 md:px-8 overflow-hidden">
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Main Content */}
        <motion.div 
          className="lg:col-span-7 flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-3 mb-6">
            <span className="ui-tag">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-phoenix opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-phoenix"></span>
              </span>
              The Cognitive Career Operating System
            </span>
          </motion.div>

          <motion.h1 variants={itemVariants} className="text-6xl md:text-8xl font-heading font-bold leading-[1.05] tracking-tight mb-6 text-text-prim drop-shadow-sm">
            Architect Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-phoenix to-dawn italic pr-4">Trajectory</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="text-xl md:text-2xl text-text-sec max-w-2xl font-body font-light leading-relaxed mb-10 min-h-[80px]">
            {displayedText}
            <span className="animate-pulse inline-block w-1 h-6 bg-phoenix ml-1 align-middle"></span>
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 z-[100]">
            <a 
              href="#how-it-works"
              className="bg-black/5 hover:bg-black/10 text-text-prim border border-black/10 px-8 py-4 rounded-full font-body font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              <PlayCircle size={18} />
              <span>View Architecture</span>
            </a>
          </motion.div>

        </motion.div>

        {/* Visual Element - 3D Holo Object */}
        <div className="lg:col-span-5 relative h-[500px] lg:h-[600px] flex items-center justify-center">
           <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              className="w-full h-full relative flex items-center justify-center"
           >
              <motion.div 
                style={{ 
                  y: translateY1
                }}
              >
                <HoloObject />
              </motion.div>
              
              {/* Floating Glass Panels (Refraction UI) */}
              <motion.div 
                className="absolute top-[20%] right-[5%] lg:right-[-20px] w-56" 
                style={{ 
                  y: translateY1
                }}
              >
                <div className="glass-panel p-5 rounded-2xl w-full animate-float shadow-xl border border-black/10 bg-white/40 backdrop-blur-md" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full bg-phoenix/10 flex items-center justify-center text-phoenix">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                      </div>
                      <div className="h-2 w-20 bg-black/10 rounded-full"></div>
                  </div>
                  <div className="h-2 w-full bg-black/5 rounded-full mb-2"></div>
                  <div className="h-2 w-2/3 bg-black/5 rounded-full"></div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-[15%] left-[5%] lg:left-[-40px] w-48" 
                style={{ 
                  y: translateY2
                }}
              >
                <div className="glass-panel p-5 rounded-2xl w-full animate-float shadow-xl border border-black/10 bg-white/40 backdrop-blur-md" style={{ animationDelay: '2.5s' }}>
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-text-sec">Strategy</span>
                      <span className="text-dawn text-xs font-bold">98%</span>
                   </div>
                   <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-dawn to-phoenix w-[98%] rounded-full"></div>
                   </div>
                </div>
              </motion.div>

           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;