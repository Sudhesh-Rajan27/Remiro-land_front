import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export const ScrollRevealText: React.FC<ScrollRevealTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 30%"]
  });

  const characters = text.split("");

  return (
    <div ref={containerRef} className={`inline-block ${className}`}>
      {characters.map((char, i) => {
        const start = i / characters.length;
        const end = start + (1 / characters.length);
        
        return (
          <Character key={i} progress={scrollYProgress} range={[start, end]}>
            {char}
          </Character>
        );
      })}
    </div>
  );
};

const Character: React.FC<{ children: string, progress: any, range: [number, number] }> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <span className="relative inline-block">
      <span className="absolute opacity-10">{children === " " ? "\u00A0" : children}</span>
      <motion.span style={{ opacity }} className="text-text-prim">{children === " " ? "\u00A0" : children}</motion.span>
    </span>
  );
};
