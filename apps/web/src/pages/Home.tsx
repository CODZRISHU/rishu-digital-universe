import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  Terminal, 
  Layers, 
  Cpu, 
  ExternalLink,
  Code2,
  Database,
  ShieldCheck,
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import { RishuAvatar } from '../avatar/RishuAvatar';
import { StarryCosmos } from '../three/StarryCosmos';
import { portfolioApi } from '../services/api';

const HERO_SKILLS = [
  { name: 'Angular & TypeScript', color: '#DD0031' },
  { name: 'Java & Spring Boot', color: '#6DB33F' },
  { name: 'Microservices & REST', color: '#00D9FF' },
  { name: 'Elasticsearch & GeoServer', color: '#FED10A' },
  { name: 'React & Three.js', color: '#61DAFB' },
  { name: 'GenAI & LangChain', color: '#A855F7' },
  { name: 'AWS & Docker', color: '#FF9900' },
];

export const Home: React.FC = () => {
  useEffect(() => {
    portfolioApi.trackEvent('page_view', '/');
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden">
      {/* 3D WebGL Cosmos Particle Layer */}
      <StarryCosmos />

      {/* Hero Ambient Radial Lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#A855F7]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/3 w-[600px] h-[600px] bg-[#00D9FF]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          {/* Left Hero Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9FF]"></span>
              </span>
              <span className="text-xs font-mono font-medium text-gray-300">
                Cognizant Programmer Analyst • Full-Stack & AI
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-heading font-black tracking-tight leading-[1.08]">
                HEY, I&apos;M <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#E2E8F0] to-[#A1A1AA]">
                  RISHU
                </span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#C4B5FD] to-[#00D9FF]">
                  JHA.
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-mono text-[#00D9FF] font-medium pt-1">
                Software Engineer | Full Stack Developer | AI Enthusiast
              </p>
            </div>

            {/* Bio Description */}
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl font-sans leading-relaxed">
              Building scalable enterprise microservices, intelligent voice-driven AI platforms,
              and cinematic web experiences. Currently delivering mission-critical geophysical application
              features at <span className="text-white font-medium">Cognizant</span> for TGS.
            </p>

            {/* Floating Tech Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {HERO_SKILLS.map((skill, index) => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.08 }}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.03] border border-white/[0.08] text-gray-300 hover:border-[#A855F7]/40 hover:text-white transition-all duration-300 cursor-default"
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                to="/projects"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-[#A855F7] to-[#7E22CE] hover:from-[#9333EA] hover:to-[#6B21A8] transition-all duration-300 shadow-glow-primary hover:scale-[1.02]"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/book-session"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-white glass-button hover:border-[#00D9FF]/50 hover:shadow-glow-secondary transition-all duration-300"
              >
                <Calendar className="w-4 h-4 text-[#00D9FF]" />
                <span>Book a Session</span>
              </Link>

              <Link
                to="/contact"
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-mono text-gray-400 hover:text-white transition-colors"
              >
                <span>Let&apos;s Connect</span>
                <span className="text-xs font-mono text-[#A855F7]">→</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Hero Content: Vector SVG Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            {/* Digital Twin Avatar Container */}
            <div className="w-full max-w-[460px] h-[600px] relative flex items-center justify-center">
              <RishuAvatar size="hero" mode="full" animation="entrance" expression="confident" />
            </div>

            {/* Sub-label under avatar */}
            <p className="text-[11px] font-mono text-gray-500 mt-2 text-center tracking-wider uppercase">
              Interact with Rishu&apos;s AI Digital Twin • Click to converse
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Metrics Bar */}
      <section className="relative z-10 border-y border-white/10 bg-[#0A0A0D]/70 backdrop-blur-lg py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-1">
            <p className="text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#C4B5FD]">
              1+ Years
            </p>
            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">Enterprise Experience</p>
            <p className="text-[11px] text-gray-500">Cognizant & TGS Geophysical</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00D9FF] to-white">
              6+ Systems
            </p>
            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">Production Projects</p>
            <p className="text-[11px] text-gray-500">KartCom, Kevin AI, DocuChat</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-heading font-black text-white">
              8.45 CGPA
            </p>
            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">B.Tech in CSE</p>
            <p className="text-[11px] text-gray-500">CUSAT, Kochi, Kerala</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C4B5FD] to-[#A855F7]">
              OCI 2025
            </p>
            <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">Certified Cloud</p>
            <p className="text-[11px] text-gray-500">Oracle & Anthropic Claude</p>
          </div>
        </div>
      </section>

      {/* Featured Projects Highlight */}
      <section className="relative z-10 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#A855F7] uppercase tracking-widest">
              <Code2 className="w-4 h-4" />
              <span>Flagship Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-heading font-bold text-white tracking-tight">
              Featured Projects
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-mono text-[#00D9FF] hover:text-white transition-colors mt-4 md:mt-0"
          >
            <span>View All Architectures</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 2-Column Flagship Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project 1: KartCom */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-[#A855F7]/40 transition-all duration-300 group space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#A855F7]/10 text-[#C4B5FD] border border-[#A855F7]/20">
                Full Stack / Microservices
              </span>
              <span className="text-xs font-mono text-gray-500">FEATURED 01</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-heading font-bold text-white group-hover:text-[#A855F7] transition-colors">
                KartCom E-Commerce Platform
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Enterprise microservices-based e-commerce platform with modular product catalogs, user session management, 
                order processing, and secure JWT token-based Spring Security transactions.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-gray-300">
              <span className="px-2.5 py-1 rounded-md bg-white/5">Spring Boot</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5">Microservices</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5">Angular</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5">MySQL</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5">JWT</span>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <Link to="/projects" className="text-xs font-mono text-[#00D9FF] flex items-center gap-1 hover:underline">
                Explore Architecture Notes <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a href="https://github.com/CODZRISHU" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Project 2: Kevin AI */}
          <div className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-[#00D9FF]/40 transition-all duration-300 group space-y-6">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/20">
                AI / Voice SaaS
              </span>
              <span className="text-xs font-mono text-gray-500">FEATURED 02</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-heading font-bold text-white group-hover:text-[#00D9FF] transition-colors">
                Kevin AI — Next-Gen Voice Interviewer
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                An AI-driven voice interview simulation platform enabling candidates to practice realistic technical rounds.
                Equipped with credit subscriptions, Razorpay payments, and voice feedback analysis.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-mono text-gray-300">
              <span className="px-2.5 py-1 rounded-md bg-white/5">AI Voice Synthesis</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5">Razorpay Gateway</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5">Credit Billing</span>
              <span className="px-2.5 py-1 rounded-md bg-white/5">React</span>
            </div>
            <div className="pt-2 flex items-center justify-between border-t border-white/10">
              <a href="https://www.kevinhr.in" target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-[#00D9FF] flex items-center gap-1 hover:underline">
                Visit Live Platform (kevinhr.in) <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <span className="text-xs font-mono text-gray-500">Production SaaS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Book a Session CTA Banner */}
      <section className="relative z-10 py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-br from-[#111116] via-[#18181F] to-[#0A0A0D] border border-white/10 shadow-2xl">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#A855F7]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#A855F7]/20 text-[#C4B5FD] border border-[#A855F7]/30">
              1-on-1 Personalized Technical Mentorship & Guidance
            </span>
            <h3 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              Ready to Accelerate Your Architecture or Project?
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Book a live 1-on-1 session for full-stack architecture reviews, Spring Boot microservices,
              AI/LLM project development, or career portfolio guidance. Instant slot booking and direct calendar confirmation.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/book-session"
                className="px-6 py-3.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-[#A855F7] to-[#7E22CE] hover:from-[#9333EA] hover:to-[#6B21A8] transition-all duration-300 shadow-glow-primary"
              >
                Schedule Appointment Now
              </Link>
              <Link
                to="/services"
                className="px-6 py-3.5 rounded-xl text-sm font-mono text-gray-300 glass-button hover:text-white"
              >
                Browse All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
