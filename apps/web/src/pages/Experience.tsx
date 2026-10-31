import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Code2, 
  GitBranch 
} from 'lucide-react';
import { portfolioApi } from '../services/api';

const EXPERIENCES = [
  {
    company: 'Cognizant',
    role: 'Programmer Analyst',
    progression: 'Programmer Analyst Trainee → Programmer Analyst',
    client: 'TGS (Enterprise Geophysical Application)',
    duration: 'July 2025 – Present',
    location: 'Pune District, Maharashtra, India',
    isCurrent: true,
    accent: '#A855F7',
    responsibilities: [
      'Developed and enhanced enterprise features using Angular, TypeScript, HTML and CSS, including reusable components, complex application workflows, and responsive UI functionality.',
      'Integrated Angular frontend services with REST APIs, handling request/response data flows and error boundaries.',
      'Collaborated across the stack with Java, Spring Boot, and REST APIs to deliver end-to-end functionality.',
      'Implemented search and geospatial retrieval using Elasticsearch and GeoServer in an enterprise geophysical domain.',
      'Diagnosed and resolved functional defects and API integration issues through root-cause analysis and defect resolution.',
      'Conducted codebase refactoring and unit tests in collaboration with enterprise engineering teams.'
    ],
    technologies: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'REST APIs', 'Elasticsearch', 'GeoServer', 'Microservices', 'Git', 'Maven']
  },
  {
    company: 'CodeAlpha',
    role: 'Web Development Intern / Software Engineer',
    duration: 'June 2024 – July 2024 (2 months)',
    location: 'Kochi, Kerala, India',
    isCurrent: false,
    accent: '#00D9FF',
    responsibilities: [
      'Built responsive and user-friendly web applications using HTML, CSS, JavaScript, and React.js.',
      'Implemented clean component-based architecture and reusable UI elements.',
      'Enhanced understanding of Git-based collaboration, branch management, and web deployment workflows.'
    ],
    technologies: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Git', 'UI/UX Design']
  },
  {
    company: 'Indian Institute of Technology, Patna',
    role: 'Machine Learning Researcher',
    duration: 'February 2024 – March 2024 (2 months)',
    location: 'Patna, Bihar, India',
    isCurrent: false,
    accent: '#C4B5FD',
    responsibilities: [
      'Researched machine learning algorithms and computational models under faculty mentorship.',
      'Conducted data preprocessing, feature engineering, and statistical evaluations on domain datasets.'
    ],
    technologies: ['Python', 'Machine Learning', 'Data Analysis', 'NumPy', 'Pandas']
  }
];

export const Experience: React.FC = () => {
  useEffect(() => {
    portfolioApi.trackEvent('page_view', '/experience');
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D9FF] uppercase tracking-widest">
          <Briefcase className="w-4 h-4" />
          <span>Vertical Career Trajectory</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight">
          Professional Experience
        </h1>
        <p className="text-gray-400 font-mono text-sm max-w-2xl">
          Track record in enterprise full-stack engineering, microservices, and specialized software development.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-16">
        {EXPERIENCES.map((exp, index) => (
          <motion.div
            key={exp.company + exp.role}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative group"
          >
            {/* Timeline Node Point */}
            <div 
              className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full border-2 border-[#050505] flex items-center justify-center transition-transform group-hover:scale-125"
              style={{ backgroundColor: exp.accent }}
            >
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>

            {/* Experience Card */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-2xl font-heading font-bold text-white">{exp.role}</h2>
                    {exp.isCurrent && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#A855F7]/20 text-[#C4B5FD] border border-[#A855F7]/30">
                        CURRENT ROLE
                      </span>
                    )}
                  </div>
                  <p className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                    {exp.company} {exp.client && <span className="text-xs font-mono text-[#00D9FF]">({exp.client})</span>}
                  </p>
                  {exp.progression && (
                    <p className="text-xs font-mono text-gray-500 pt-0.5">
                      Career Progression: {exp.progression}
                    </p>
                  )}
                </div>

                <div className="text-left sm:text-right space-y-1 text-xs font-mono text-gray-400">
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#A855F7]" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="flex items-center sm:justify-end gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00D9FF]" />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400">Key Contributions:</h4>
                <ul className="space-y-2 text-sm text-gray-300 leading-relaxed">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-[#A855F7] mt-1 text-xs">▹</span>
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies Badges */}
              <div className="pt-2 border-t border-white/5 flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-gray-300 border border-white/[0.06]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
