import React from 'react';

export const HoloObject: React.FC = () => {
  return (
    <div className="relative w-[500px] h-[500px] preserve-3d perspective-container flex items-center justify-center animate-float-slow pointer-events-none">
      
      {/* Core Energy - Phoenix Red/Orange - Opacity 0.80 */}
      <div className="absolute w-32 h-32 bg-phoenix/80 blur-[80px] rounded-full animate-pulse"></div>

      {/* Ring 1 - Large Slow (Red) - Opacity 0.85 */}
      <div className="absolute w-[400px] h-[400px] rounded-full border border-black/5 border-t-phoenix/80 animate-spin-slow preserve-3d" style={{ animationDuration: '30s' }}>
        <div className="absolute top-0 left-1/2 w-2 h-2 bg-phoenix rounded-full shadow-[0_0_15px_#D65A5A]"></div>
      </div>

      {/* Ring 2 - Medium Off-Axis (Gold) - Opacity 0.60 */}
      <div className="absolute w-[300px] h-[300px] rounded-full border border-black/5 border-b-dusty/60 animate-spin-slow preserve-3d" style={{ animationDirection: 'reverse', animationDuration: '20s', transform: 'rotateX(60deg)' }}>
        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-dusty rounded-full shadow-[0_0_15px_#F5C369]"></div>
      </div>

      {/* Ring 3 - Small Fast (Orange) - Opacity 0.80 */}
      <div className="absolute w-[200px] h-[200px] rounded-full border-2 border-dashed border-dawn/80 animate-spin-slow preserve-3d" style={{ animationDuration: '10s' }}></div>

      {/* Central Tesseract (Tinted Crystal) */}
      <div className="relative w-24 h-24 preserve-3d animate-spin-slow" style={{ animationDuration: '15s', animationTimingFunction: 'linear' }}>
        {[0, 90, 180, 270].map((deg, i) => (
           <div key={i} className="absolute inset-0 border border-phoenix/20 bg-phoenix/10 backdrop-blur-[4px] glass-panel" style={{ transform: `rotateY(${deg}deg) translateZ(48px)` }}></div>
        ))}
        <div className="absolute inset-0 border border-phoenix/20 bg-phoenix/10 backdrop-blur-[4px] glass-panel" style={{ transform: `rotateX(90deg) translateZ(48px)` }}></div>
        <div className="absolute inset-0 border border-phoenix/20 bg-phoenix/10 backdrop-blur-[4px] glass-panel" style={{ transform: `rotateX(-90deg) translateZ(48px)` }}></div>
      </div>

    </div>
  );
};