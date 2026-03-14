import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Activity, BookOpen, Video, CheckSquare, FileText, Linkedin, GitBranch } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const dashboardItems = [
    { icon: <Activity className="w-5 h-5" />, title: "Career Readiness Score" },
    { icon: <BookOpen className="w-5 h-5" />, title: "Skills Bank" },
    { icon: <GitBranch className="w-5 h-5" />, title: "Learning Roadmap" },
    { icon: <Video className="w-5 h-5" />, title: "Interview Performance Analytics" },
    { icon: <CheckSquare className="w-5 h-5" />, title: "Application Tracker" },
    { icon: <FileText className="w-5 h-5" />, title: "Resume Versions" },
    { icon: <Linkedin className="w-5 h-5" />, title: "LinkedIn Content" },
    { icon: <LayoutDashboard className="w-5 h-5" />, title: "Career Graph Visualization" }
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
          The Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-dawn to-phoenix">Command Center</span>
        </h1>
        <p className="text-xl text-text-sec max-w-3xl mx-auto leading-relaxed font-body">
          While the dashboard organizes information, the primary interaction remains Remiro Chat.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {dashboardItems.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center hover:border-phoenix/50 transition-colors group cursor-pointer shadow-sm hover:shadow-md"
            onClick={() => navigate('/home')}
          >
            <div className="w-12 h-12 rounded-full bg-white/60 flex items-center justify-center mb-4 border border-white/40 text-dawn group-hover:text-phoenix transition-colors shadow-sm">
              {item.icon}
            </div>
            <h3 className="text-sm font-heading font-bold text-text-prim group-hover:text-dawn transition-colors">{item.title}</h3>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-20 glass-panel p-12 rounded-3xl relative overflow-hidden shadow-md"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-phoenix/10 to-transparent opacity-50"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-heading font-bold text-text-prim mb-4">Chat-First Experience</h2>
            <p className="text-text-sec leading-relaxed max-w-xl font-body">
              The dashboard provides a visual overview, but the true power of Remiro lies in conversation. The system translates your chat interactions into structured data that populates these views.
            </p>
          </div>
          <div className="w-full md:w-1/3 h-48 rounded-2xl border border-white/40 bg-white/60 flex items-center justify-center relative overflow-hidden shadow-sm">
             <div className="absolute inset-0 bg-neural-grid opacity-10 animate-pulse"></div>
             <div className="text-phoenix font-heading font-bold text-xl relative z-10">Remiro Chat</div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
