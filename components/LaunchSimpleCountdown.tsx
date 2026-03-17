import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LaunchSimpleCountdown: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-03-21T12:00:00+05:30').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
          ),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-24 pb-20 px-6 max-w-7xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <div className="inline-flex items-center space-x-2 bg-phoenix/10 text-phoenix px-4 py-2 rounded-full font-bold tracking-widest uppercase text-xs mb-8 border border-phoenix/30">
          <Rocket className="w-4 h-4" />
          <span>Official Launch</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 text-text-prim">
          March 21st{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-dawn to-phoenix">
            12:00 PM IST
          </span>
        </h1>
        <p className="text-xl text-text-sec max-w-2xl mx-auto leading-relaxed font-body">
          The Cognitive Career Operating System is almost ready.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex space-x-4 md:space-x-8 mb-20 relative z-10 justify-center"
      >
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Minutes', value: timeLeft.minutes },
          { label: 'Seconds', value: timeLeft.seconds },
        ].map((unit, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-20 h-24 md:w-32 md:h-36 glass-panel rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <span className="text-4xl md:text-6xl font-heading font-bold text-text-prim tabular-nums">
                {unit.value.toString().padStart(2, '0')}
              </span>
            </div>
            <span className="text-text-sec font-body tracking-widest uppercase text-xs md:text-sm font-bold">
              {unit.label}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="glass-panel p-10 md:p-16 rounded-3xl border border-phoenix/30 relative overflow-hidden max-w-3xl w-full text-center group shadow-md hover:shadow-lg transition-shadow mx-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-phoenix/10 to-transparent opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full bg-phoenix/10 flex items-center justify-center mx-auto mb-6 border border-phoenix/30 text-phoenix">
            <Users className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-heading font-bold text-text-prim mb-4">
            Founding Users Program
          </h2>
          <p className="text-text-sec text-lg leading-relaxed mb-8 max-w-xl mx-auto font-body">
            The first 150 users will receive free access to the Remiro AI
            platform. These early users will help shape the evolution of Remiro
            and receive priority access to new capabilities as the system grows.
          </p>
          <button
            type="button"
            onClick={() => {
              const token = localStorage.getItem('remiro_token');
              if (!token) {
                navigate('/register');
              } else {
                navigate('/launch');
              }
            }}
            className="bg-gradient-to-r from-dawn to-phoenix text-white px-8 py-4 rounded-full font-bold tracking-widest uppercase text-sm hover:shadow-[0_0_30px_rgba(214,90,90,0.3)] transition-all transform hover:-translate-y-1"
          >
            Join Early Access
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default LaunchSimpleCountdown;

