import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const FluidBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -50]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -80]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -30]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-base-bg">
      
      {/* Texture - Noise Overlay */}
      <div className="noise-overlay opacity-[0.4] mix-blend-multiply"></div>

      {/* Liquid Orbs with Parallax Wrappers */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: y1 }}>
        <div className="absolute inset-0 animate-drift-slow" style={{ animationDelay: '0s' }}>
          <div className="liquid-orb orb-1 animate-neuro-pulse mix-blend-multiply" style={{ animationDelay: '0s' }}></div>
        </div>
      </motion.div>
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: y2 }}>
        <div className="absolute inset-0 animate-drift-slow" style={{ animationDelay: '-5s', animationDirection: 'reverse' }}>
          <div className="liquid-orb orb-2 animate-neuro-pulse mix-blend-multiply" style={{ animationDelay: '-5s' }}></div>
        </div>
      </motion.div>
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: y3 }}>
        <div className="absolute inset-0 animate-drift-slow" style={{ animationDelay: '-10s' }}>
          <div className="liquid-orb orb-3 animate-neuro-pulse mix-blend-multiply" style={{ animationDelay: '-10s', animationDirection: 'reverse' }}></div>
        </div>
      </motion.div>
      
      {/* Light Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-white/60 z-30"></div>
    </div>
  );
};

export default FluidBackground;