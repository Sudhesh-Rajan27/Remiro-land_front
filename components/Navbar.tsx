import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Product', href: '/product' },
    { name: 'How it Works', href: '/how-it-works' },
    { name: 'Agents', href: '/agents' },
    { name: 'Engine', href: '/engine' },
    { name: 'Features', href: '/features' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Stories', href: '/stories' },
    { name: 'Launch', href: '/launch' },
    { name: 'About', href: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div 
        className={`
          relative mt-4 pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${isScrolled ? 'w-[95%] xl:w-[1100px] lg:w-[960px] md:w-[850px] mt-4' : 'w-[95%] md:w-full md:max-w-7xl mt-6'}
        `}
      >
        <div 
          className={`
            relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isScrolled 
              ? 'glass-panel shadow-2xl backdrop-blur-2xl border border-black/10 bg-white/80' 
              : 'bg-transparent border border-transparent'
            }
          `}
        >
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-3 z-10 group cursor-pointer">
            <img
              src="/remiroo.png"
              alt="Remiro"
              className="h-10 w-auto rounded-xl shadow-sm object-contain "
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
            <div className={`flex items-center p-1 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'bg-transparent' : 'bg-black/5 border border-black/10 shadow-sm backdrop-blur-md'}`}>
              {navLinks.slice(0, 6).map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href}
                  className={`text-sm font-body font-medium px-4 py-2 rounded-full transition-all duration-300 hover:bg-black/5 ${location.pathname === link.href ? 'text-text-prim bg-black/5 shadow-sm' : 'text-text-sec hover:text-text-prim'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4 z-10">
            <Link 
              to="/launch"
              className={`
                group relative px-6 py-2.5 rounded-full font-body text-xs font-bold tracking-widest uppercase overflow-hidden transition-all duration-300
                ${isScrolled 
                  ? 'bg-phoenix text-white shadow-md hover:shadow-lg hover:-translate-y-0.5' 
                  : 'bg-black/5 text-text-prim border border-black/10 hover:bg-black/10 backdrop-blur-md'
                }
              `}
            >
              <span className="relative z-10">Start Session</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="lg:hidden z-10">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-prim p-2 hover:bg-white/40 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-4 mx-2 glass-panel rounded-3xl p-6 flex flex-col space-y-4 animate-in fade-in slide-in-from-top-4 duration-300 shadow-xl">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href}
                className={`font-heading text-2xl px-2 transition-colors ${location.pathname === link.href ? 'text-phoenix font-bold' : 'text-text-sec hover:text-text-prim'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-black/5 my-2"></div>
            <Link 
              to="/launch"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-phoenix text-center py-4 rounded-xl font-body font-bold tracking-wider uppercase text-sm text-white shadow-md"
            >
              Launch Interface
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;