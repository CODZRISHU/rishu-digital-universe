import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle2, 
  ArrowRight,
  Code2,
  Terminal,
  Cpu,
  UserCheck
} from 'lucide-react';
import { portfolioApi } from '../services/api';

const SERVICES_DATA = [
  {
    id: 'full-stack-dev',
    title: 'Full Stack Web Application Development',
    category: 'Development',
    description: 'End-to-end production web applications engineered with React 19/Angular, NestJS/Spring Boot, clean databases, and rock-solid cloud deployments.',
    price: 4999,
    durationMinutes: 60,
    deliveryMethod: 'Google Meet + GitHub Code Delivery',
    features: [
      'Modern responsive UI with Tailwind & Framer Motion',
      'REST or GraphQL backend API with validation & security',
      'Relational (MySQL) or NoSQL (MongoDB) data modeling',
      'Deployment pipeline & Docker setup'
    ],
    icon: Code2,
    accent: '#A855F7'
  },
  {
    id: 'spring-microservices',
    title: 'Spring Boot & Microservices Engineering',
    category: 'Backend & Systems',
    description: 'Enterprise microservices design, service discovery, API gateway routing, and distributed transaction patterns built for high scale.',
    price: 3999,
    durationMinutes: 60,
    deliveryMethod: 'Google Meet + Architecture Blueprint',
    features: [
      'Spring Boot 3.x microservice decomposition',
      'Elasticsearch integration & high-speed indexing',
      'Spring Security & stateless JWT token protection',
      'Fault tolerance and resilient fallback logic'
    ],
    icon: Terminal,
    accent: '#00D9FF'
  },
  {
    id: 'ai-voice-apps',
    title: 'AI, LLM & Voice Applications Development',
    category: 'AI & Innovation',
    description: 'Custom generative AI solutions: LangChain RAG pipelines, voice conversational agents, and LLM tool integrations like Kevin AI and DocuChat.',
    price: 4499,
    durationMinutes: 60,
    deliveryMethod: 'Google Meet + Prototype Demo',
    features: [
      'RAG vector database search (FAISS / Pinecone)',
      'Sub-second voice interview & speech agent pipelines',
      'Prompt engineering with Anthropic Claude & Google Gemini',
      'Razorpay monetization & subscription credit systems'
    ],
    icon: Cpu,
    accent: '#C4B5FD'
  },
  {
    id: 'mentorship-session',
    title: '1-on-1 Engineering & Career Mentorship',
    category: 'Mentorship',
    description: 'Personalized 60-minute technical session covering full-stack system design, career roadmap from college (CUSAT) to MNC (Cognizant), and portfolio auditing.',
    price: 999,
    durationMinutes: 60,
    deliveryMethod: 'Live Google Meet Session',
    features: [
      'Comprehensive resume & portfolio project review',
      'System design interview problem solving',
      'Full-stack career transition guidance',
      'Written action summary sent post-meeting'
    ],
    icon: UserCheck,
    accent: '#48BB78'
  }
];

export const Services: React.FC = () => {
  useEffect(() => {
    portfolioApi.trackEvent('page_view', '/services');
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#A855F7] uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>Services & One-to-One Consultations</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight">
          Solutions & Consulting Marketplace
        </h1>
        <p className="text-gray-400 font-mono text-sm max-w-2xl">
          Hire me for enterprise engineering contracts or reserve dedicated 1-on-1 technical advisory sessions with transparent upfront pricing.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {SERVICES_DATA.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-[#A855F7]/40 transition-all duration-300 flex flex-col justify-between group space-y-6"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10"
                    style={{ backgroundColor: `${service.accent}15`, color: service.accent }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-heading font-bold text-white">
                      ₹{service.price.toLocaleString()}
                    </span>
                    <p className="text-[11px] font-mono text-gray-400">/ session ({service.durationMinutes}m)</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase text-[#00D9FF]">{service.category}</span>
                  <h3 className="text-2xl font-heading font-bold text-white group-hover:text-[#A855F7] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-mono uppercase text-gray-400">Included Deliverables:</h4>
                  <ul className="space-y-2 text-xs text-gray-300 font-mono">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#A855F7] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono text-gray-400">
                  <Video className="w-4 h-4 text-[#00D9FF]" />
                  <span>{service.deliveryMethod}</span>
                </div>

                <Link
                  to={`/book-session?service=${service.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono text-white bg-gradient-to-r from-[#A855F7] to-[#7E22CE] hover:from-[#9333EA] hover:to-[#6B21A8] transition-all shadow-glow-primary hover:scale-[1.02]"
                >
                  <span>Book This Session</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
