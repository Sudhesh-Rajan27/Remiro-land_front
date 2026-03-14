import React from 'react';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-black/10 bg-white/40 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-12 pb-32">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-heading font-bold text-text-prim mb-2">Remiro</h3>
            <p className="text-text-sec text-sm font-body">The Cognitive Career Operating System</p>
          </div>

          
        </div>

        <div className="mt-12 pt-8 border-t border-black/10 flex flex-col md:flex-row justify-between items-center text-xs text-text-sec/60 font-body">
          <p>&copy; {new Date().getFullYear()} Remiro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;