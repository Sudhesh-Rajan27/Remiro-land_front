import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function Stories() {
  const stories = [
    {
      role: "UX Designer",
      quote: "Remiro helped me gain clarity in a complex career decision. Instead of just giving me templates, it analyzed my portfolio and market trends to suggest a pivot into spatial computing design.",
      author: "Sarah J."
    },
    {
      role: "Data Scientist",
      quote: "The skill gap mapping was a revelation. Remiro didn't just tell me to learn Python; it identified specific machine learning frameworks that were trending in the industries I wanted to target.",
      author: "Michael T."
    },
    {
      role: "Product Manager",
      quote: "I was struggling to articulate my transition from engineering to product. The Identity Architect agent helped me reframe my experience in a way that resonated with hiring managers.",
      author: "Elena R."
    }
  ];

  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen relative">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 relative z-10"
      >
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-text-prim">
          User <span className="text-transparent bg-clip-text bg-gradient-to-r from-dawn to-phoenix">Stories</span>
        </h1>
        <p className="text-xl text-text-sec max-w-3xl mx-auto leading-relaxed font-body">
          How professionals are using Remiro to navigate complex career transitions with clarity and strategy.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 relative z-10">
        {stories.map((story, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:border-phoenix/50 transition-colors flex flex-col justify-between shadow-sm hover:shadow-md"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-phoenix/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="relative z-10">
              <Quote className="w-10 h-10 text-phoenix/30 mb-6 group-hover:text-phoenix/60 transition-colors" />
              <p className="text-text-sec leading-relaxed text-lg italic mb-8 font-body">
                "{story.quote}"
              </p>
            </div>
            
            <div className="relative z-10 border-t border-black/5 pt-6 mt-auto">
              <div className="font-heading font-bold text-text-prim text-lg">{story.author}</div>
              <div className="text-dawn text-sm font-body font-bold">{story.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
