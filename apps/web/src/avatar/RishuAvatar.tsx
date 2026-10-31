import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type AvatarExpression = 'idle' | 'happy' | 'thinking' | 'confident' | 'excited' | 'greeting';
export type AvatarAnimation = 'idle' | 'wave' | 'lookAround' | 'celebrate' | 'entrance';

interface RishuAvatarProps {
  expression?: AvatarExpression;
  animation?: AvatarAnimation;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'full';
  mode?: 'bust' | 'full';
  className?: string;
  showBadge?: boolean;
  interactive?: boolean;
  onAvatarClick?: () => void;
}

export const RishuAvatar: React.FC<RishuAvatarProps> = ({
  expression = 'idle',
  animation = 'idle',
  size = 'md',
  mode,
  className = '',
  showBadge = true,
  interactive = true,
  onAvatarClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [currentExpression, setCurrentExpression] = useState<AvatarExpression>(expression);

  // Sync expression prop
  useEffect(() => {
    setCurrentExpression(expression);
  }, [expression]);

  // Determine if full-body or bust framing
  const isFull = mode ? mode === 'full' : (size === 'hero' || size === 'full' || size === 'xl');

  // Size styling classes
  const sizeClasses = {
    sm: 'w-20 h-20 rounded-full',
    md: 'w-36 h-36 rounded-full',
    lg: 'w-56 h-56 rounded-full',
    xl: 'w-72 h-[460px]',
    hero: 'w-full max-w-[480px] h-[640px]',
    full: 'w-full max-w-[500px] h-[680px]'
  }[size];

  // Interactive Click Quotes
  const handleClick = () => {
    if (onAvatarClick) {
      onAvatarClick();
      return;
    }

    const quotes = [
      "Hey! I'm Rishu's AI Digital Twin.",
      "Programmer Analyst at Cognizant • Full-Stack & AI Systems.",
      "Explore my flagship projects like Kevin AI & KartCom!",
      "Need to review an architecture or book a 1-on-1 session? Let's connect!"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setSpeechBubble(randomQuote);
    setCurrentExpression('happy');
    setTimeout(() => {
      setSpeechBubble(null);
      setCurrentExpression(expression);
    }, 4500);
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className={`relative select-none flex items-center justify-center cursor-pointer group ${sizeClasses} ${className}`}
    >
      {/* Speech Bubble Tooltip */}
      <AnimatePresence>
        {speechBubble && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute -top-14 z-40 px-4 py-2 bg-[#18181F]/95 backdrop-blur-xl border border-[#A855F7]/50 text-xs font-mono text-white rounded-2xl shadow-glow-primary max-w-[300px] text-center"
          >
            {speechBubble}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#18181F] border-r border-b border-[#A855F7]/50 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Atmospheric Vertical Backlight */}
      <motion.div
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-x-8 top-12 bottom-12 rounded-full bg-gradient-to-t from-[#00D9FF]/20 via-[#A855F7]/25 to-transparent blur-3xl pointer-events-none"
      />

      {/* Grounded Holographic Stage & Floor Shadow (For Full Body View) */}
      {isFull && (
        <div className="absolute bottom-4 inset-x-0 flex flex-col items-center justify-center pointer-events-none z-0">
          {/* Floor Contact Occlusion Shadow */}
          <div className="w-64 h-5 rounded-full bg-black/90 blur-md" />
          {/* Glowing Cybernetic Pedestal Rings */}
          <div className="w-80 h-9 rounded-full border border-[#00D9FF]/40 bg-gradient-to-b from-[#00D9FF]/10 to-transparent blur-[1px] -mt-3" />
          <div className="w-96 h-12 rounded-full border border-[#A855F7]/30 border-dashed animate-spin-slow opacity-50 -mt-6" />
        </div>
      )}

      {/* Futuristic Orbit Rings for Bust / Floating sizes */}
      {!isFull && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[108%] h-[108%] rounded-full border border-[#A855F7]/30 border-dashed animate-spin-slow opacity-60" />
        </div>
      )}

      {/* Digital Twin Image */}
      <motion.div
        animate={
          animation === 'entrance'
            ? { opacity: [0, 1], scale: [0.94, 1], y: [15, 0] }
            : { y: [0, -6, 0] }
        }
        transition={
          animation === 'entrance'
            ? { duration: 1.2, ease: "easeOut" }
            : { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }
        className={`w-full h-full relative z-10 flex items-center justify-center ${
          !isFull ? 'rounded-full border-2 border-white/20 p-1 bg-[#111116] overflow-hidden' : ''
        }`}
      >
        <img
          src="/assets/rishu-twin.png"
          alt="Rishu Kumar Jha — Personal Digital Universe Twin"
          className={`w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.7)] group-hover:scale-[1.02] transition-transform duration-500 ${
            !isFull ? 'object-cover object-top rounded-full' : ''
          }`}
          loading="eager"
        />
      </motion.div>

      {/* Futuristic Online Twin Status Badge */}
      {showBadge && (
        <div className="absolute -bottom-2 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0A0D]/95 border border-white/15 backdrop-blur-xl shadow-glow-primary z-20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9FF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9FF]" />
          </span>
          <span className="text-[10px] font-mono font-medium text-gray-200 tracking-wider uppercase">
            DIGITAL TWIN // ONLINE
          </span>
        </div>
      )}
    </div>
  );
};
