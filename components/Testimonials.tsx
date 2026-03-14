import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Elena R.",
    role: "UX Designer",
    text: "Clarity comes from the prism. The fluid interface made me feel calm while making stressful career changes.",
    avatar: "https://picsum.photos/100/100?random=1"
  },
  {
    name: "Marcus J.",
    role: "Data Scientist",
    text: "Unlike other bots, this felt like talking to a mentor. The skill mapping visualization helped me pivot to AI.",
    avatar: "https://picsum.photos/100/100?random=2"
  },
  {
    name: "Sarah L.",
    role: "Product Manager",
    text: "Remiro helped me articulate my value proposition in ways I hadn't considered. Truly next-gen guidance.",
    avatar: "https://picsum.photos/100/100?random=3"
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

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 md:py-32 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="text-center mb-20"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-heading font-bold text-text-prim">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-dawn to-phoenix italic">
              User Transmissions
            </span>
          </motion.h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((t, idx) => (
            <motion.div key={idx} variants={itemVariants} className="h-full">
              <div className="h-full flex flex-col items-center text-center p-10 bg-white/60 backdrop-blur-xl border border-black/5 rounded-[2rem] hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(214,90,90,0.08)] hover:border-phoenix/20 transition-all duration-500 relative overflow-hidden group">
                
                {/* Subtle gradient hover effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-phoenix/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="relative z-10 flex flex-col h-full items-center">
                  <Quote size={40} className="text-phoenix/20 mb-6 group-hover:text-phoenix/40 transition-colors duration-300" />
                  
                  <p className="text-text-sec font-body text-lg md:text-xl italic mb-10 leading-relaxed">"{t.text}"</p>
                  
                  <div className="mt-auto flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-dawn to-phoenix shadow-sm shadow-phoenix/10">
                       <img src={t.avatar} alt={t.name} className="w-full h-full rounded-full object-cover border-2 border-white" referrerPolicy="no-referrer" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-text-prim font-heading">{t.name}</h4>
                      <p className="text-[10px] text-dawn uppercase tracking-widest font-bold">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;