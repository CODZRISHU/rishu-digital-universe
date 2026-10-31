import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  MapPin, 
  Briefcase, 
  FileDown, 
  Terminal, 
  Award, 
  BookOpen, 
  Heart,
  Compass,
  Cpu
} from 'lucide-react';
import { RishuAvatar } from '../avatar/RishuAvatar';
import { portfolioApi } from '../services/api';

export const About: React.FC = () => {
  useEffect(() => {
    portfolioApi.trackEvent('page_view', '/about');
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#A855F7] uppercase tracking-widest">
          <Terminal className="w-4 h-4" />
          <span>Professional Identity</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight">
          About Rishu Kumar Jha
        </h1>
        <p className="text-gray-400 font-mono text-sm max-w-2xl">
          Software Engineer, Full-Stack Developer, and AI Systems Builder based in Pune & Ranchi, India.
        </p>
      </div>

      {/* Grid: Bio & Avatar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 w-full flex flex-col items-center shadow-glow-primary">
            <RishuAvatar size="lg" expression="happy" />
            <div className="mt-6 text-center space-y-1 w-full border-t border-white/10 pt-4">
              <h2 className="font-heading font-bold text-xl text-white">Rishu Kumar Jha</h2>
              <p className="text-xs font-mono text-[#00D9FF]">Programmer Analyst @ Cognizant</p>
              <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#A855F7]" />
                <span>Pune, Maharashtra / Ranchi, Jharkhand</span>
              </div>
              <div className="pt-4">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono text-white bg-gradient-to-r from-[#A855F7] to-[#7E22CE] hover:from-[#9333EA] hover:to-[#6B21A8] transition-all shadow-glow-primary"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Verified Resume</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Narrative & Philosophy */}
        <div className="lg:col-span-7 space-y-6 text-gray-300 leading-relaxed font-sans">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#A855F7]" />
              <span>Professional Journey</span>
            </h3>
            <p>
              I am a software engineer with strong hands-on experience in building scalable full-stack applications,
              microservices architectures, and AI-powered products. Currently working as a <span className="text-white font-semibold">Programmer Analyst at Cognizant</span>,
              I develop core features, REST API integrations, and geospatial query workflows for an enterprise geophysical application for TGS.
            </p>
            <p>
              My engineering foundation spans frontend craftsmanship in <span className="text-white font-medium">Angular & React</span>, robust backend microservices in <span className="text-white font-medium">Java & Spring Boot</span>, search engine querying via <span className="text-white font-medium">Elasticsearch & GeoServer</span>, and modern AI/LLM pipelines with <span className="text-white font-medium">LangChain, Python, & Voice AI</span>.
            </p>
            <p>
              Whether designing clean UI component systems or resolving complex distributed transaction bottlenecks, I focus on turning architectural requirements into resilient, test-proven applications.
            </p>
          </div>

          {/* Core Technical Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
              <Cpu className="w-5 h-5 text-[#00D9FF]" />
              <h4 className="font-heading font-semibold text-white text-base">Full-Stack & Microservices</h4>
              <p className="text-xs text-gray-400">
                Spring Boot, Angular, Node.js, REST APIs, Elasticsearch, GeoServer, and distributed relational/NoSQL databases.
              </p>
            </div>
            <div className="p-5 rounded-2xl glass-panel border border-white/5 space-y-2">
              <Terminal className="w-5 h-5 text-[#A855F7]" />
              <h4 className="font-heading font-semibold text-white text-base">AI & Voice Automation</h4>
              <p className="text-xs text-gray-400">
                LLM integrations, LangChain, RAG embeddings, speech-to-speech voice interviewing platforms, and NLP pipelines.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Verified Education Timeline */}
      <div className="space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D9FF] uppercase tracking-widest">
            <GraduationCap className="w-4 h-4" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl font-heading font-bold text-white">Education & Academia</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Degree */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#A855F7] bg-[#A855F7]/10 px-2.5 py-1 rounded-md border border-[#A855F7]/20">
                August 2021 – May 2025
              </span>
              <span className="text-xs font-mono font-bold text-[#00D9FF]">CGPA: 8.45 / 10</span>
            </div>
            <h3 className="text-xl font-heading font-bold text-white">
              B.Tech in Computer Science and Engineering
            </h3>
            <p className="text-sm font-medium text-gray-300">
              Cochin University of Science and Technology (CUSAT), Kochi, Kerala
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Core Coursework: Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, Software Engineering, Cloud Computing.
            </p>
          </div>

          {/* Schooling */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-md">
                Senior Secondary & Secondary
              </span>
              <span className="text-xs font-mono text-gray-300">Class XII: 87.4% • Class X: 87.8%</span>
            </div>
            <h3 className="text-xl font-heading font-bold text-white">
              DAV Nandraj Public School, Ranchi
            </h3>
            <p className="text-sm font-medium text-gray-300">
              Ranchi, Jharkhand, India
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Distinction in Physics, Chemistry, and Mathematics with deep foundational interest in computational science.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
