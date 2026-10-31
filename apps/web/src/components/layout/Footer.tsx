import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  Terminal, 
  ShieldAlert,
  Heart
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#050505] border-t border-white/10 pt-16 pb-12 overflow-hidden z-10">
      {/* Background cyber grid and glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#A855F7]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Identity Column */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#A855F7] to-[#00D9FF] p-[1.5px]">
                <div className="w-full h-full bg-[#0A0A0D] rounded-[10px] flex items-center justify-center font-heading font-black text-white text-base">
                  RJ
                </div>
              </div>
              <span className="font-heading font-bold text-xl text-white tracking-wide">
                RISHU JHA
              </span>
            </div>
            <p className="text-sm text-gray-400 max-w-md leading-relaxed">
              Software Engineer, Programmer Analyst at Cognizant & AI Systems Architect.
              Building digital experiences through code, creativity, and scalable distributed systems.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/CODZRISHU"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-button flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00D9FF]/50 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/rishu-kumar-jha-51741328a"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass-button flex items-center justify-center text-gray-400 hover:text-white hover:border-[#00D9FF]/50 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:shivayjha7@gmail.com"
                className="w-10 h-10 rounded-xl glass-button flex items-center justify-center text-gray-400 hover:text-white hover:border-[#A855F7]/50 transition-colors"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-sm tracking-wider uppercase text-[#C4B5FD]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-mono text-gray-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About & Journey</Link></li>
              <li><Link to="/experience" className="hover:text-white transition-colors">Cognizant & Career</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">Featured Projects</Link></li>
              <li><Link to="/skills" className="hover:text-white transition-colors">Interactive Skills</Link></li>
              <li><Link to="/certifications" className="hover:text-white transition-colors">Certifications</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services & Mentorship</Link></li>
            </ul>
          </div>

          {/* Live Status & Direct Book */}
          <div className="space-y-3">
            <h4 className="font-heading font-semibold text-white text-sm tracking-wider uppercase text-[#00D9FF]">
              Direct Connect
            </h4>
            <div className="p-4 rounded-2xl glass-panel space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-pulse" />
                <span className="text-xs font-mono text-gray-300">Pune, Maharashtra / Remote</span>
              </div>
              <p className="text-xs text-gray-400">
                Open for high-impact technical consulting, engineering mentorship, and innovative collaborations.
              </p>
              <Link
                to="/book-session"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-[#A855F7] hover:text-[#C4B5FD] transition-colors pt-1"
              >
                <span>Reserve a 1-on-1 slot</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-500">
          <p>© {new Date().getFullYear()} Rishu Kumar Jha. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/admin/login" className="hover:text-gray-300 flex items-center gap-1 transition-colors">
              <Terminal className="w-3.5 h-3.5 text-[#A855F7]" />
              <span>Admin Access</span>
            </Link>
            <span className="text-gray-700">|</span>
            <span className="text-gray-400">Crafted with React 19, NestJS & Three.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
