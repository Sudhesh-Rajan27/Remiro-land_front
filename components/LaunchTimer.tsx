import React, { useEffect, useState } from 'react';
import { ArrowRight, Rocket, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const backendBaseUrl =
  import.meta.env.VITE_BACKEND_URL || 'https://remiro-land-back.onrender.com';

const LaunchTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [seatsLeft, setSeatsLeft] = useState<number | null>(null);

  useEffect(() => {
    const eventSource = new EventSource(`${backendBaseUrl}/api/seats/stream`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.seatsLeft !== undefined) {
          setSeatsLeft(data.seatsLeft);
        }
      } catch (err) {
        console.error('Failed to parse SSE data', err);
      }
    };

    eventSource.onerror = (err) => {
      console.error('EventSource failed:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch(`${backendBaseUrl}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        // If this email is already registered, show a friendly message
        if (data.message && String(data.message).toLowerCase().includes('already')) {
          setStatus('success');
          setMessage("You're already in the list");
        } else {
          setStatus('success');
          setMessage('Successfully registered for early access!');
        }
        setSeatsLeft(data.seatsLeft);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Registration failed');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  useEffect(() => {
    // Target Date: March 21st, 2026 12:00 PM IST
    const targetDate = new Date('2026-03-21T12:00:00+05:30').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 px-4 md:px-8 overflow-hidden bg-white/30 backdrop-blur-sm border-y border-black/5">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <div className="inline-flex items-center space-x-2 border border-phoenix/20 bg-phoenix/5 rounded-full px-4 py-1.5 mb-8">
            <Rocket className="w-4 h-4 text-phoenix" />
            <span className="text-xs font-bold tracking-widest uppercase text-phoenix">System Go-Live</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-text-prim mb-12">
            The Future of Career Architecture <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-phoenix to-dawn italic">Arrives Soon</span>
          </h2>

          <div className="glass-panel p-8 md:p-12 rounded-[2.5rem] border border-black/10 shadow-2xl w-full max-w-4xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-phoenix via-dawn to-dusty"></div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-12">
              <div className="flex flex-col items-center">
                <span className="font-heading font-bold text-6xl md:text-8xl tracking-tighter text-text-prim">{timeLeft.days.toString().padStart(2, '0')}</span>
                <span className="text-sm md:text-base text-text-sec uppercase tracking-widest mt-2 font-bold">Days</span>
              </div>
              <span className="text-text-sec/20 font-light text-5xl md:text-7xl hidden md:block -mt-8">:</span>
              <div className="flex flex-col items-center">
                <span className="font-heading font-bold text-6xl md:text-8xl tracking-tighter text-text-prim">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-sm md:text-base text-text-sec uppercase tracking-widest mt-2 font-bold">Hours</span>
              </div>
              <span className="text-text-sec/20 font-light text-5xl md:text-7xl hidden md:block -mt-8">:</span>
              <div className="flex flex-col items-center">
                <span className="font-heading font-bold text-6xl md:text-8xl tracking-tighter text-text-prim">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-sm md:text-base text-text-sec uppercase tracking-widest mt-2 font-bold">Minutes</span>
              </div>
              <span className="text-text-sec/20 font-light text-5xl md:text-7xl hidden md:block -mt-8">:</span>
              <div className="flex flex-col items-center">
                <span className="font-heading font-bold text-6xl md:text-8xl tracking-tighter text-phoenix">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-sm md:text-base text-phoenix uppercase tracking-widest mt-2 font-bold">Seconds</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-w-2xl mx-auto">
              <div className="flex items-center gap-3 bg-black/5 border border-black/10 rounded-2xl px-6 py-4 w-full md:w-auto justify-center">
                <Users className="w-6 h-6 text-phoenix" />
                <div className="text-lg font-bold text-phoenix font-display">
                  {seatsLeft !== null ? seatsLeft : '---'} <span className="text-sm text-text-sec font-body font-normal">seats left</span>
                </div>
              </div>

              <form onSubmit={handleRegister} className="relative w-full md:flex-1">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address" 
                    className="w-full bg-white/60 border border-black/10 rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-phoenix/50 focus:border-phoenix font-body text-text-prim placeholder:text-text-sec/50 transition-all shadow-inner text-base"
                    required
                    disabled={status === 'loading' || status === 'success' || seatsLeft === 0}
                  />
                  <button 
                    type="submit" 
                    disabled={status === 'loading' || status === 'success' || seatsLeft === 0}
                    className="bg-phoenix hover:bg-[#c24a4a] text-white px-8 py-4 rounded-2xl font-body font-bold text-base tracking-wide transition-all hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <span>{status === 'loading' ? 'Securing...' : status === 'success' ? 'Secured' : 'Get Early Access'}</span>
                    {status === 'success' ? <CheckCircle size={20} /> : <ArrowRight size={20} />}
                  </button>
                </div>
                {message && (
                  <p className={`absolute -bottom-8 left-0 w-full text-center text-sm font-medium ${status === 'success' ? 'text-dusty' : 'text-phoenix'}`}>
                    {message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LaunchTimer;
