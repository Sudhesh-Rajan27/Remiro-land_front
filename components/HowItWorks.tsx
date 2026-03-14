import React, { useRef } from 'react';
import { Share2, Users, Cpu, MessageSquareText } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const steps = [
  {
    icon: <Share2 className="w-6 h-6" />,
    title: "Graph Routing",
    id: "01",
    description: "Your query is analyzed by our central Router Node, which determines the specific domain of your career challenge."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Specialist Activation",
    id: "02",
    description: "Relevant agents—like the 'Grand Strategy Director' or 'CMO'—are activated to process your specific needs."
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    title: "Insight Synthesis",
    id: "03",
    description: "A Response Synthesizer merges the output from multiple agents into one coherent, strategic master plan."
  },
  {
    icon: <MessageSquareText className="w-6 h-6" />,
    title: "Profile Evolution",
    id: "04",
    description: "Every interaction updates your long-term structured profile, allowing the system to grow with your career."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const HowItWorks: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const beamHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="how-it-works" ref={containerRef} className="py-24 md:py-32 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-24 text-center"
        >
          <motion.span variants={itemVariants} className="text-phoenix font-body font-bold text-xs tracking-[0.2em] uppercase mb-4 block">
            Process
          </motion.span>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-heading font-bold mb-6 text-text-prim">
            Multi-Agent <span className="text-transparent bg-clip-text bg-gradient-to-r from-phoenix to-dawn italic">Orchestration</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-text-sec max-w-2xl mx-auto font-body text-lg md:text-xl font-light">
            Remiro isn't a single bot. It's a team of 6 specialized AIs working in unison to process your career data.
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Scroll Progress Beam (Background) */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-black/5 -translate-x-1/2 md:translate-x-[-1px]"></div>
          
          {/* Scroll Progress Beam (Active) - Fills based on scroll */}
          <motion.div 
            className="absolute left-[28px] md:left-1/2 top-0 w-[2px] bg-phoenix shadow-[0_0_15px_rgba(214,90,90,0.4)] -translate-x-1/2 md:translate-x-[-1px] origin-top"
            style={{ height: beamHeight }}
          >
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-phoenix rounded-full blur-[4px] animate-pulse"></div>
          </motion.div>

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 === 0 ? 'md:flex-row-right' : 'md:flex-row-reverse'}`}
              >
                
                {/* Text Content */}
                <motion.div variants={itemVariants} className={`flex-1 ${index % 2 === 0 ? 'md:text-right text-left pl-16 md:pl-0' : 'text-left pl-16 md:pl-0'}`}>
                  <div className="bg-white/60 backdrop-blur-xl border border-black/5 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div className={`inline-block px-4 py-1.5 rounded-full bg-phoenix/5 border border-phoenix/10 mb-6 ${index % 2 === 0 ? 'md:ml-auto' : ''}`}>
                       <span className="font-body font-bold text-phoenix text-xs tracking-widest">NODE_{step.id}</span>
                    </div>
                    <h3 className="text-3xl font-heading font-bold text-text-prim mb-4">{step.title}</h3>
                    <p className="text-text-sec text-base md:text-lg leading-relaxed font-body">{step.description}</p>
                  </div>
                </motion.div>

                {/* Central Node */}
                <motion.div variants={itemVariants} className="absolute left-[28px] md:relative md:left-auto flex-shrink-0 z-10 -translate-x-1/2 md:translate-x-0 mt-8 md:mt-0">
                   <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border border-black/10 shadow-sm flex items-center justify-center relative group transition-all duration-500 hover:scale-110 hover:border-phoenix/30 hover:shadow-md">
                      <div className="absolute inset-0 bg-phoenix/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative text-phoenix">
                        {step.icon}
                      </div>
                   </div>
                </motion.div>

                {/* Spacer for Flex */}
                <div className="flex-1 hidden md:block"></div>
                
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;