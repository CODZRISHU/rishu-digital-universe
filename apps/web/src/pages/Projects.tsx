import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  ExternalLink, 
  Github, 
  Layers, 
  X, 
  ArrowUpRight, 
  Cpu, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { portfolioApi } from '../services/api';

const PROJECTS_DATA = [
  {
    id: 'kartcom',
    title: 'KartCom E-Commerce Platform',
    category: 'Full Stack',
    tag: 'Enterprise Microservices',
    description: 'A microservices-based e-commerce platform with modular product catalog, user identity, and order management, secured by Spring Security and JWT.',
    longDescription: 'KartCom is designed following clean microservices architecture patterns. Each domain (Catalog, Auth, Orders, Payments) operates as an independent service with its own relational database boundary, communicating through high-speed REST contracts and API Gateway routing. Implemented complete JWT token lifecycle and stateless Spring Security sessions.',
    techStack: ['Spring Boot', 'Microservices', 'Angular', 'MySQL', 'JWT', 'Spring Security', 'Maven'],
    githubUrl: 'https://github.com/CODZRISHU',
    liveUrl: '',
    architectureNotes: 'Distributed service registry, API Gateway pattern, independent MySQL databases per domain service, resilient error fallback patterns.',
    challenges: 'Ensuring atomic order transactions across distributed microservices and designing modular Angular client components for dynamic product filtering.',
    featured: true,
  },
  {
    id: 'kevin-ai',
    title: 'Kevin AI — Voice Interviewer Platform',
    category: 'AI / SaaS',
    tag: 'Next-Gen Voice AI',
    description: 'An AI-powered voice interview platform designed to help software engineering candidates practice realistic technical rounds through real-time voice interactions.',
    longDescription: 'Kevin AI simulates interactive technical interviews with dynamic conversational follow-up questions. Built with credit-based subscription billing, multi-duration interview packages, usage tracking, and Razorpay payment gateway integration for seamless candidate checkout.',
    techStack: ['React', 'Voice AI Synthesis', 'Razorpay Gateway', 'Node.js', 'LLMs', 'Tailwind CSS'],
    githubUrl: 'https://github.com/CODZRISHU',
    liveUrl: 'https://www.kevinhr.in',
    architectureNotes: 'Sub-second audio synthesis pipeline, secure Razorpay webhook signature verification, candidate response evaluation engine.',
    challenges: 'Minimizing voice response latency and managing credit billing concurrency.',
    featured: true,
  },
  {
    id: 'docuchat',
    title: 'DocuChat — Contextual Document QA',
    category: 'AI / NLP',
    tag: 'RAG & Embeddings',
    description: 'A document-based conversational QA system enabling users to upload multi-page PDF documents and interrogate them contextually using vector search.',
    longDescription: 'DocuChat leverages Retrieval-Augmented Generation (RAG) to parse complex PDF documentation into semantic chunks, indexing them in high-dimensional vector spaces (FAISS/Pinecone) and synthesizing answers using state-of-the-art LLMs.',
    techStack: ['Python', 'LangChain', 'FAISS', 'OpenAI/Claude LLMs', 'Embeddings', 'Streamlit'],
    githubUrl: 'https://github.com/CODZRISHU',
    liveUrl: '',
    architectureNotes: 'Document chunking pipeline, cosine similarity vector search, citation grounding to reduce hallucinations.',
    challenges: 'Handling dense PDF tables and complex multi-page document hierarchies without losing context.',
    featured: false,
  },
  {
    id: 'alanpress',
    title: 'AlanPress — Voice-Driven News Feed',
    category: 'AI / Voice',
    tag: 'Voice Navigation',
    description: 'A hands-free news reader application that lets users navigate, filter, and listen to real-time global news headlines through conversational voice commands.',
    longDescription: 'Users can ask "Give me the latest technology news from Wired" or "Read the headlines", and AlanPress parses the intent, queries news APIs, and reads aloud summaries with interactive visual synchronization.',
    techStack: ['React', 'Alan AI', 'News API', 'JavaScript', 'CSS3'],
    githubUrl: 'https://github.com/CODZRISHU',
    liveUrl: '',
    architectureNotes: 'Natural Language Understanding (NLU) voice scripts mapped directly to frontend state dispatches.',
    challenges: 'Managing asynchronous speech synthesis with responsive DOM card rendering.',
    featured: false,
  },
  {
    id: 'eventx',
    title: 'EventX — Event Management System',
    category: 'Full Stack',
    tag: 'MERN Architecture',
    description: 'A modern event management platform with ticket registration, authenticated organizer dashboards, and real-time attendee tracking.',
    longDescription: 'EventX allows organizers to publish events, track participant capacity, generate digital tickets, and inspect registration metrics in an intuitive dashboard.',
    techStack: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JWT', 'Tailwind CSS'],
    githubUrl: 'https://github.com/CODZRISHU',
    liveUrl: '',
    architectureNotes: 'Mongoose schema validation, token-authenticated routes, role-based organizer/attendee access control.',
    challenges: 'Preventing overbooking when multiple users register simultaneously.',
    featured: false,
  },
  {
    id: 'taxiwala',
    title: 'Taxiwala — Ride Dispatch & Maps',
    category: 'Full Stack',
    tag: 'Geospatial & Mapping',
    description: 'A ride booking application featuring dynamic driver geolocation, Mapbox route calculations, and responsive dispatching workflows.',
    longDescription: 'Taxiwala combines Mapbox GL geospatial APIs with a Spring Boot backend to calculate real-time routing, fare estimates, and driver-passenger pickup coordination.',
    techStack: ['Spring Boot', 'Angular', 'Mapbox GL', 'Microservices', 'REST APIs'],
    githubUrl: 'https://github.com/CODZRISHU',
    liveUrl: '',
    architectureNotes: 'Geospatial indexing, route distance calculation, bidirectional state management.',
    challenges: 'High-frequency location update polling and client map marker rendering performance.',
    featured: false,
  }
];

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<any | null>(null);

  useEffect(() => {
    portfolioApi.trackEvent('page_view', '/projects');
  }, []);

  const categories = ['All', 'Full Stack', 'AI / SaaS', 'AI / NLP', 'AI / Voice'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-3 mb-12">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#A855F7] uppercase tracking-widest">
          <Code2 className="w-4 h-4" />
          <span>Interactive Software Gallery</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight">
          Featured Engineering Projects
        </h1>
        <p className="text-gray-400 font-mono text-sm max-w-2xl">
          Architectural solutions ranging from distributed enterprise microservices to cutting-edge generative AI & voice platforms.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-[#A855F7] to-[#7E22CE] text-white shadow-glow-primary'
                : 'glass-panel text-gray-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="glass-panel rounded-3xl p-6 border border-white/10 hover:border-[#A855F7]/40 flex flex-col justify-between group transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-white/5 text-[#C4B5FD] border border-white/10">
                  {project.tag}
                </span>
                {project.featured && (
                  <span className="flex items-center gap-1 text-[10px] font-mono text-[#00D9FF]">
                    <Sparkles className="w-3 h-3" /> FEATURED
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-heading font-bold text-white group-hover:text-[#A855F7] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] text-gray-300 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => setActiveProject(project)}
                className="text-xs font-mono text-[#00D9FF] hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Architecture Specs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Live Platform"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Source Code"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Architecture Modal */}
      <AnimatePresence>
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel-elevated max-w-2xl w-full p-8 rounded-3xl border border-white/15 relative space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 p-2 rounded-xl glass-button text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-xs font-mono text-[#A855F7] uppercase tracking-wider">
                  {activeProject.category} // {activeProject.tag}
                </span>
                <h2 className="text-2xl font-heading font-bold text-white">
                  {activeProject.title}
                </h2>
              </div>

              <div className="space-y-3 text-sm text-gray-300 leading-relaxed font-sans">
                <p>{activeProject.longDescription}</p>
                
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
                  <h4 className="text-xs font-mono uppercase text-[#00D9FF]">Architecture & Design Patterns</h4>
                  <p className="text-xs text-gray-300 font-mono">{activeProject.architectureNotes}</p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1.5">
                  <h4 className="text-xs font-mono uppercase text-[#C4B5FD]">Engineering Challenges & Solutions</h4>
                  <p className="text-xs text-gray-300">{activeProject.challenges}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-gray-400">Complete Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.techStack.map((tech: string) => (
                    <span key={tech} className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 text-gray-200 border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                {activeProject.liveUrl && (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono text-white bg-gradient-to-r from-[#00D9FF] to-[#0099BF] hover:opacity-90"
                  >
                    <span>Visit Live Platform</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                <a
                  href={activeProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono glass-button text-gray-200 hover:text-white"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
