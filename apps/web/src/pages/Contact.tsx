import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  Github, 
  Linkedin, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  Terminal,
  MessageSquare
} from 'lucide-react';
import { portfolioApi } from '../services/api';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    portfolioApi.trackEvent('page_view', '/contact');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await portfolioApi.sendContactMessage({ name, email, subject, message });
      setIsSuccess(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      portfolioApi.trackEvent('contact_submit', '/contact');
    } catch (err: any) {
      setErrorMessage(err.response?.data?.message || 'Failed to dispatch message. Please email directly at shivayjha7@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-3 mb-16">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-[#00D9FF] uppercase tracking-widest">
          <Terminal className="w-4 h-4" />
          <span>Direct Communications Gateway</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight">
          Let&apos;s Connect & Build
        </h1>
        <p className="text-gray-400 font-mono text-sm max-w-2xl">
          Interested in discussing scalable microservices, consulting opportunities, voice AI platforms, or full-stack engineering roles? Drop a message directly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-xl font-heading font-bold text-white">Contact Direct Channels</h3>
            
            <div className="space-y-4 text-xs font-mono">
              <a
                href="mailto:shivayjha7@gmail.com"
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4 hover:border-[#A855F7]/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#A855F7]/10 flex items-center justify-center text-[#A855F7] group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-400">Primary Email</p>
                  <p className="text-white font-medium text-sm">shivayjha7@gmail.com</p>
                </div>
              </a>

              <a
                href="https://github.com/CODZRISHU"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4 hover:border-[#00D9FF]/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00D9FF]/10 flex items-center justify-center text-[#00D9FF] group-hover:scale-105 transition-transform">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-400">GitHub Profile</p>
                  <p className="text-white font-medium text-sm">github.com/CODZRISHU</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/rishu-kumar-jha-51741328a"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4 hover:border-[#C4B5FD]/40 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C4B5FD]/10 flex items-center justify-center text-[#C4B5FD] group-hover:scale-105 transition-transform">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-gray-400">LinkedIn Connect</p>
                  <p className="text-white font-medium text-sm">Rishu Kumar Jha</p>
                </div>
              </a>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-300">
                  <MapPin className="w-5 h-5 text-[#00D9FF]" />
                </div>
                <div>
                  <p className="text-gray-400">Current Work Location</p>
                  <p className="text-white font-medium text-sm">Pune District, Maharashtra, India</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6">
            <h3 className="text-2xl font-heading font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#A855F7]" />
              <span>Send An Encrypted Transmission</span>
            </h3>

            {isSuccess && (
              <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-300 text-xs font-mono flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                <span>Transmission received successfully! Rishu will respond to your inquiry shortly.</span>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-300">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#A855F7]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-gray-300">Your Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#A855F7]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Project Consultation / Engineering Collaboration"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#A855F7]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-gray-300">Message *</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Describe your inquiry or project requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#A855F7] resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-xs font-mono text-white bg-gradient-to-r from-[#A855F7] to-[#7E22CE] hover:from-[#9333EA] hover:to-[#6B21A8] transition-all shadow-glow-primary hover:scale-[1.02] disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Transmitting...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
