import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('shivayjha7@gmail.com');
  const [password, setPassword] = useState('RishuUniverse2025!Secure');
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError(null);

    try {
      await login({ email, password });
      navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid credentials or backend unavailable. Please verify connection.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#A855F7]/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel-elevated max-w-md w-full p-8 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative z-10 space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#A855F7]/15 border border-[#A855F7]/30 flex items-center justify-center mx-auto text-[#A855F7]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-white tracking-tight">
            Administrator Gateway
          </h1>
          <p className="text-xs font-mono text-gray-400">
            Authenticated CMS & Business Management System
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-gray-300">Admin Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#A855F7]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-gray-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#A855F7]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-mono text-white bg-gradient-to-r from-[#A855F7] to-[#7E22CE] hover:from-[#9333EA] hover:to-[#6B21A8] transition-all shadow-glow-primary hover:scale-[1.01] disabled:opacity-50"
          >
            <span>{isLoggingIn ? 'Authenticating...' : 'Sign In To Mission Control'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-gray-400 hover:text-white">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio Universe</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
