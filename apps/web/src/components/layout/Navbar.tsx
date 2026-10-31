import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  Calendar, 
  FileDown, 
  ShieldCheck, 
  Sparkles,
  ExternalLink 
} from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Skills', path: '/skills' },
  { name: 'Certifications', path: '/certifications' },
  { name: 'Services', path: '/services' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[#050505]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/80'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#00D9FF] p-[1.5px] transition-transform duration-300 group-hover:scale-105 shadow-glow-primary">
              <div className="w-full h-full bg-[#0A0A0D] rounded-[10px] flex items-center justify-center font-heading font-black text-white text-lg tracking-wider">
                RJ
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-white tracking-wide text-lg group-hover:text-[#00D9FF] transition-colors">
                RISHU JHA
              </span>
              <span className="text-[10px] font-mono text-[#A1A1AA] tracking-widest uppercase">
                Digital Universe
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full border border-white/10">
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors rounded-full ${
                    isActive ? 'text-white' : 'text-[#A1A1AA] hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#A855F7]/30 to-[#00D9FF]/20 border border-[#A855F7]/40 shadow-glow-primary -z-10"
                      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono text-gray-300 glass-button hover:text-white"
            >
              <FileDown className="w-3.5 h-3.5 text-[#00D9FF]" />
              <span>Resume</span>
            </a>

            <Link
              to="/book-session"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-white bg-gradient-to-r from-[#A855F7] to-[#7E22CE] hover:from-[#9333EA] hover:to-[#6B21A8] transition-all duration-300 shadow-glow-primary hover:scale-[1.02]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Session</span>
            </Link>

            <Link
              to="/admin/login"
              title="Admin Portal"
              className="p-2 rounded-xl glass-button text-gray-400 hover:text-white"
            >
              <ShieldCheck className="w-4 h-4 text-[#A855F7]" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <Link
              to="/book-session"
              className="p-2 rounded-xl bg-gradient-to-r from-[#A855F7] to-[#7E22CE] text-white"
            >
              <Calendar className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl glass-button text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[65px] z-30 p-4 bg-[#0A0A0D]/95 backdrop-blur-2xl border-b border-white/10 lg:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#A855F7]/20 border border-[#A855F7]/40 text-white'
                        : 'text-gray-300 hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              <div className="h-px bg-white/10 my-2" />

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-mono glass-button text-gray-200"
                >
                  <FileDown className="w-4 h-4 text-[#00D9FF]" />
                  <span>Resume</span>
                </a>
                <Link
                  to="/admin/login"
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-mono glass-button text-gray-200"
                >
                  <ShieldCheck className="w-4 h-4 text-[#A855F7]" />
                  <span>Admin CMS</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
