import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Cloud, 
  Sparkles,
  Calendar
} from 'lucide-react';
import { portfolioApi } from '../services/api';

const CERTIFICATIONS_DATA = [
  {
    title: 'Oracle Cloud Infrastructure 2025 Certified Foundations Associate',
    issuer: 'Oracle',
    issueDate: '2025',
    credentialId: 'OCI-FOUND-2025-VERIFIED',
    verificationLink: 'https://www.oracle.com/cloud/',
    description: 'Validates foundational knowledge of Oracle Cloud Infrastructure (OCI) architecture, cloud security, compute instances, virtual cloud networks (VCN), and storage concepts.',
    skills: ['Oracle Cloud (OCI)', 'Cloud Security', 'Networking', 'Compute & Storage', 'Identity & Access (IAM)'],
    accent: '#F80000'
  },
  {
    title: 'Claude Certified Architect Foundations',
    issuer: 'Anthropic Claude',
    issueDate: '2025',
    credentialId: 'ANTHROPIC-CLAUDE-ARCH',
    verificationLink: 'https://anthropic.com',
    description: 'Demonstrates expertise in Claude model capabilities, context window optimization, tool-use integration, safety guardrails, and autonomous agent orchestration.',
    skills: ['Anthropic Claude', 'Prompt Engineering', 'Context Architecture', 'AI Safety & Tool Use'],
    accent: '#D97706'
  },
  {
    title: 'Build with Gemini',
    issuer: 'Google',
    issueDate: '2025',
    credentialId: 'GOOGLE-GEMINI-CERT',
    verificationLink: 'https://ai.google.dev',
    description: 'Certifies competency in leveraging Google Gemini models, multimodal prompt architectures, API integrations, and deploying production generative AI applications.',
    skills: ['Gemini Enterprise', 'Multimodal AI', 'Function Calling', 'Google AI Studio'],
    accent: '#00D9FF'
  }
];

export const Certifications: React.FC = () => {
  useEffect(() => {
    portfolioApi.trackEvent('page_view', '/certifications');
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C4B5FD] uppercase tracking-widest">
          <Award className="w-4 h-4" />
          <span>Accredited Expertise</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight">
          Industry Certifications
        </h1>
        <p className="text-gray-400 font-mono text-sm max-w-2xl">
          Verified technical certifications across cloud infrastructure, artificial intelligence, and enterprise architectures.
        </p>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CERTIFICATIONS_DATA.map((cert, idx) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div 
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-heading font-black text-lg border border-white/10 shadow-glow-primary"
                  style={{ backgroundColor: `${cert.accent}15`, color: cert.accent }}
                >
                  <Award className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-white/5 text-gray-300 border border-white/10">
                  {cert.issueDate}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-gray-400">{cert.issuer}</span>
                <h3 className="text-xl font-heading font-bold text-white group-hover:text-[#A855F7] transition-colors leading-snug">
                  {cert.title}
                </h3>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed">
                {cert.description}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/[0.04] text-gray-300 border border-white/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-gray-500">
                {cert.credentialId}
              </span>
              <a
                href={cert.verificationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-[#00D9FF] hover:text-white flex items-center gap-1 transition-colors"
              >
                <span>Verify Credential</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
