import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Layers, 
  Database, 
  Terminal, 
  Cloud, 
  Sparkles, 
  CheckCircle2,
  Wrench
} from 'lucide-react';
import { portfolioApi } from '../services/api';

const SKILL_CATEGORIES = [
  {
    category: 'Frontend Development',
    icon: Layers,
    accent: '#00D9FF',
    skills: [
      { name: 'Angular', level: 92, note: 'TGS Geophysical enterprise app' },
      { name: 'TypeScript', level: 90, note: 'Strict typing, reusable interfaces' },
      { name: 'React.js', level: 88, note: 'Hooks, Vite, Component systems' },
      { name: 'JavaScript (ES6+)', level: 94, note: 'Async, DOM, closures' },
      { name: 'HTML5 & CSS3', level: 95, note: 'Semantic, responsive layouts' },
      { name: 'Tailwind CSS', level: 92, note: 'Design systems & utility styling' },
    ]
  },
  {
    category: 'Backend & Microservices',
    icon: Terminal,
    accent: '#A855F7',
    skills: [
      { name: 'Java', level: 90, note: 'Enterprise OOP, Concurrency' },
      { name: 'Spring Boot', level: 88, note: 'REST APIs, Microservices, Security' },
      { name: 'Node.js & Express', level: 85, note: 'Asynchronous event loops' },
      { name: 'REST APIs', level: 94, note: 'OpenAPI Swagger, HTTP contracts' },
      { name: 'Microservices Architecture', level: 86, note: 'Service boundaries, modularity' },
    ]
  },
  {
    category: 'Databases & Search',
    icon: Database,
    accent: '#FED10A',
    skills: [
      { name: 'Elasticsearch', level: 85, note: 'Complex search & enterprise query' },
      { name: 'MongoDB', level: 88, note: 'Aggregations, Mongoose schemas' },
      { name: 'MySQL / SQL', level: 86, note: 'Relational schema, indexing, joins' },
      { name: 'Oracle Database', level: 80, note: 'Enterprise data transactions' },
    ]
  },
  {
    category: 'AI / Machine Learning & Voice',
    icon: Sparkles,
    accent: '#C4B5FD',
    skills: [
      { name: 'Python', level: 86, note: 'Data analysis, ML scripts' },
      { name: 'LangChain & RAG', level: 84, note: 'Vector indexing, DocuChat' },
      { name: 'LLMs & Prompt Engineering', level: 90, note: 'Claude, Gemini Enterprise' },
      { name: 'Voice AI Synthesis', level: 85, note: 'Kevin AI voice interviews' },
      { name: 'Embeddings & Vector Search', level: 82, note: 'FAISS, cosine similarity' },
    ]
  },
  {
    category: 'Cloud, DevOps & Tooling',
    icon: Cloud,
    accent: '#FF9900',
    skills: [
      { name: 'AWS', level: 82, note: 'EC2, S3, Cloud infrastructure' },
      { name: 'Oracle Cloud (OCI)', level: 85, note: '2025 Certified Foundations Associate' },
      { name: 'Docker', level: 84, note: 'Multi-stage builds, containers' },
      { name: 'Git & GitHub', level: 92, note: 'Branching, PRs, CI workflows' },
      { name: 'Maven', level: 88, note: 'Spring Boot dependency lifecycle' },
      { name: 'CI/CD Pipelines', level: 80, note: 'Automated GitHub Actions' },
    ]
  },
  {
    category: 'Domain & Specialized Systems',
    icon: Wrench,
    accent: '#48BB78',
    skills: [
      { name: 'GeoServer', level: 84, note: 'Geospatial web services & WMS/WFS' },
      { name: 'Mapbox GL', level: 82, note: 'Interactive location mapping' },
      { name: 'Postman', level: 92, note: 'API testing & automated suites' },
      { name: 'System Design', level: 85, note: 'Distributed microservice caching' },
    ]
  }
];

export const Skills: React.FC = () => {
  useEffect(() => {
    portfolioApi.trackEvent('page_view', '/skills');
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D9FF] uppercase tracking-widest">
          <Cpu className="w-4 h-4" />
          <span>Interactive Skill Universe</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight">
          Technical Expertise & Stack
        </h1>
        <p className="text-gray-400 font-mono text-sm max-w-2xl">
          Comprehensive breakdown of technologies utilized across enterprise projects at Cognizant, AI products, and scalable full-stack web applications.
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SKILL_CATEGORIES.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${cat.accent}15`, color: cat.accent }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  {cat.category}
                </h3>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-gray-200 font-medium">{skill.name}</span>
                      <span className="text-gray-500">{skill.level}%</span>
                    </div>
                    {/* Animated Progress Track */}
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: cat.accent }}
                      />
                    </div>
                    <p className="text-[10px] font-mono text-gray-500">
                      {skill.note}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
