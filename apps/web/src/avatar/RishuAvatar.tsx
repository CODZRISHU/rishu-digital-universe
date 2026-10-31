import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type AvatarExpression = 'idle' | 'happy' | 'thinking' | 'confident' | 'excited' | 'greeting';
export type AvatarAnimation = 'idle' | 'wave' | 'lookAround' | 'celebrate' | 'entrance';

interface RishuAvatarProps {
  expression?: AvatarExpression;
  animation?: AvatarAnimation;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  showBadge?: boolean;
  interactive?: boolean;
  onAvatarClick?: () => void;
}

export const RishuAvatar: React.FC<RishuAvatarProps> = ({
  expression = 'idle',
  animation = 'idle',
  size = 'md',
  className = '',
  showBadge = true,
  interactive = true,
  onAvatarClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [irisOffset, setIrisOffset] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const [currentExpression, setCurrentExpression] = useState<AvatarExpression>(expression);

  // Sync expression prop
  useEffect(() => {
    setCurrentExpression(expression);
  }, [expression]);

  // Size mapping
  const sizeClasses = {
    sm: 'w-24 h-28',
    md: 'w-48 h-56',
    lg: 'w-72 h-84',
    xl: 'w-96 h-112',
    hero: 'w-full max-w-[460px] aspect-[5/6]'
  }[size];

  // Natural Blinking Cycle
  useEffect(() => {
    let blinkTimer: ReturnType<typeof setTimeout>;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 140);
      const nextInterval = Math.random() * 3000 + 2500; // 2.5s - 5.5s
      blinkTimer = setTimeout(triggerBlink, nextInterval);
    };

    blinkTimer = setTimeout(triggerBlink, 3000);
    return () => clearTimeout(blinkTimer);
  }, []);

  // Eye tracking cursor
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.38; // eye level

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance === 0) return;

      // Limit iris movement to max 4px in any direction
      const maxDist = 4.2;
      const factor = Math.min(distance / 300, 1) * maxDist;
      const clampedX = (deltaX / distance) * factor;
      const clampedY = (deltaY / distance) * factor;

      setIrisOffset({ x: clampedX, y: clampedY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  // Interactive Click Quotes
  const handleClick = () => {
    if (onAvatarClick) {
      onAvatarClick();
      return;
    }

    const quotes = [
      "Hey! I'm Rishu's AI Digital Twin.",
      "Building scalable distributed systems & AI apps at Cognizant.",
      "Explore my projects like Kevin AI & KartCom!",
      "Want to discuss an idea or book a session? Let's connect!"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setSpeechBubble(randomQuote);
    setCurrentExpression('happy');
    setTimeout(() => {
      setSpeechBubble(null);
      setCurrentExpression(expression);
    }, 4000);
  };

  // Expression-based mouth and eyebrow transforms
  const getEyebrowOffset = () => {
    switch (currentExpression) {
      case 'thinking': return { leftY: -3, rightY: 1 };
      case 'excited': return { leftY: -4, rightY: -4 };
      case 'happy': return { leftY: -1, rightY: -1 };
      default: return { leftY: 0, rightY: 0 };
    }
  };

  const eyebrows = getEyebrowOffset();

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
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute -top-16 z-30 px-4 py-2 bg-[#18181F]/90 backdrop-blur-md border border-[#A855F7]/40 text-xs font-mono text-white rounded-xl shadow-glow-primary max-w-[280px] text-center"
          >
            {speechBubble}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#18181F] border-r border-b border-[#A855F7]/40 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Ambient Aura */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#A855F7]/25 via-transparent to-[#00D9FF]/20 blur-2xl pointer-events-none"
      />

      {/* Main Vector SVG */}
      <motion.div
        animate={
          animation === 'entrance'
            ? { opacity: [0, 1], scale: [0.85, 1] }
            : { y: [0, -6, 0] }
        }
        transition={
          animation === 'entrance'
            ? { duration: 1.2, ease: "easeOut" }
            : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
        }
        className="w-full h-full relative"
      >
        <svg
          viewBox="0 0 500 600"
          className="w-full h-full filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
        >
          <defs>
            <radialGradient id="cyber-glow-comp" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stop-color="#A855F7" stop-opacity="0.38"/>
              <stop offset="50%" stop-color="#00D9FF" stop-opacity="0.18"/>
              <stop offset="100%" stop-color="#050505" stop-opacity="0"/>
            </radialGradient>
            
            <linearGradient id="skin-gradient-comp" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#EAB690"/>
              <stop offset="60%" stop-color="#D79971"/>
              <stop offset="100%" stop-color="#BD7A52"/>
            </linearGradient>

            <linearGradient id="skin-shadow-comp" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#BD7A52"/>
              <stop offset="100%" stop-color="#8F5131"/>
            </linearGradient>

            <linearGradient id="hair-gradient-comp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#2D2B33"/>
              <stop offset="40%" stop-color="#19181D"/>
              <stop offset="100%" stop-color="#0D0D10"/>
            </linearGradient>

            <linearGradient id="shirt-maroon-comp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#5C1838"/>
              <stop offset="50%" stop-color="#45122B"/>
              <stop offset="100%" stop-color="#2B0A1A"/>
            </linearGradient>

            <linearGradient id="iris-gradient-comp" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#503524"/>
              <stop offset="60%" stop-color="#2E1C12"/>
              <stop offset="100%" stop-color="#120A05"/>
            </linearGradient>
          </defs>

          {/* Ambient Outer Rings */}
          <g id="comp-ambient-glow">
            <circle cx="250" cy="270" r="220" fill="url(#cyber-glow-comp)" />
            <circle cx="250" cy="270" r="215" fill="none" stroke="#A855F7" stroke-width="1.2" stroke-dasharray="8 12" opacity="0.4" />
            <circle cx="250" cy="270" r="235" fill="none" stroke="#00D9FF" stroke-width="0.8" stroke-dasharray="4 24" opacity="0.3" />
          </g>

          {/* Shirt & Shoulders (Maroon Button-Up) */}
          <g id="comp-shirt">
            <path d="M120 460 C 145 420, 190 395, 250 395 C 310 395, 355 420, 380 460 L 415 600 L 85 600 Z" fill="url(#shirt-maroon-comp)" />
            {/* Pattern Dots */}
            <g opacity="0.18" fill="#F472B6">
              <circle cx="160" cy="460" r="3" /><circle cx="200" cy="445" r="2.5" />
              <circle cx="300" cy="445" r="2.5" /><circle cx="340" cy="460" r="3" />
              <circle cx="150" cy="510" r="2" /><circle cx="220" cy="500" r="3" />
              <circle cx="280" cy="500" r="3" /><circle cx="350" cy="510" r="2" />
            </g>
            {/* Placket & Buttons */}
            <path d="M236 410 L264 410 L261 600 L239 600 Z" fill="#3B0E23" />
            <circle cx="250" cy="445" r="3.5" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="1" />
            <circle cx="250" cy="495" r="3.5" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="1" />
            <circle cx="250" cy="545" r="3.5" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="1" />

            {/* Collars */}
            <path d="M250 415 L 180 395 L 210 440 L 246 422 Z" fill="#6E1E44" />
            <path d="M250 415 L 320 395 L 290 440 L 254 422 Z" fill="#6E1E44" />
          </g>

          {/* Neck */}
          <g id="comp-neck">
            <path d="M212 300 L 212 390 C 212 405, 288 405, 288 390 L 288 300 Z" fill="url(#skin-shadow-comp)" />
            <path d="M220 300 L 220 380 Q 250 398 280 380 L 280 300 Z" fill="url(#skin-gradient-comp)" />
            <path d="M246 345 Q 250 350 254 345" stroke="#A76540" stroke-width="2" fill="none" stroke-linecap="round" />
          </g>

          {/* Ears & Earbud */}
          <g id="comp-ears">
            <path d="M172 230 C 158 230, 155 265, 170 282 C 174 286, 178 286, 180 278 Z" fill="url(#skin-gradient-comp)" />
            <path d="M168 245 C 164 250, 164 265, 172 270" stroke="#BD7A52" stroke-width="2.5" fill="none" />
            <path d="M328 230 C 342 230, 345 265, 330 282 C 326 286, 322 286, 320 278 Z" fill="url(#skin-gradient-comp)" />
            <path d="M332 245 C 336 250, 336 265, 328 270" stroke="#BD7A52" stroke-width="2.5" fill="none" />
            {/* Earbud */}
            <ellipse cx="327" cy="256" rx="4.5" ry="7" fill="#1E2024" stroke="#475569" stroke-width="1" />
            <circle cx="327" cy="254" r="1.5" fill="#00D9FF" opacity="0.9" />
          </g>

          {/* Face Contour */}
          <g id="comp-face">
            <path d="M174 210 C 170 140, 330 140, 326 210 C 326 270, 310 326, 250 342 C 190 326, 174 270, 174 210 Z" fill="url(#skin-gradient-comp)" />
            <path d="M178 240 C 182 300, 210 330, 250 340 C 290 330, 318 300, 322 240 C 324 285, 295 334, 250 337 C 205 334, 176 285, 178 240 Z" fill="#9E6340" opacity="0.25" />
          </g>

          {/* Facial Hair (Moustache & Trimmed Chin Beard) */}
          <g id="comp-facial-hair">
            <path d="M228 288 C 238 285, 246 289, 250 292 C 254 289, 262 285, 272 288 C 265 295, 255 296, 250 296 C 245 296, 235 295, 228 288 Z" fill="#1C1B20" opacity="0.88" />
            <path d="M245 315 L 255 315 L 253 322 L 247 322 Z" fill="#1C1B20" opacity="0.75" />
            <path d="M226 330 C 238 338, 262 338, 274 330 C 272 338, 264 343, 250 343 C 236 343, 228 338, 226 330 Z" fill="#1C1B20" opacity="0.82" />
          </g>

          {/* Mouth & Confident Smile */}
          <g id="comp-mouth">
            <path d="M225 298 Q 250 300 275 298 Q 250 322 225 298 Z" fill="#4A1521" />
            <path d="M230 299 Q 250 301 270 299 Q 266 307 250 307 Q 234 307 230 299 Z" fill="#F8FAFC" />
            <path d="M224 298 C 236 295, 245 297, 250 298 C 255 297, 264 295, 276 298 C 265 301, 255 301, 250 301 C 245 301, 235 301, 224 298 Z" fill="#995843" />
            <path d="M230 308 Q 250 318 270 308 Q 250 314 230 308 Z" fill="#B36B54" />
          </g>

          {/* Nose */}
          <g id="comp-nose">
            <path d="M246 205 L 243 260 Q 237 268 245 272" stroke="#BD7A52" stroke-width="2.2" stroke-linecap="round" fill="none" opacity="0.6" />
            <path d="M240 268 Q 250 274 260 268" stroke="#8F5131" stroke-width="2.2" stroke-linecap="round" fill="none" />
            <circle cx="238" cy="269" r="1.4" fill="#6E381C" />
            <circle cx="262" cy="269" r="1.4" fill="#6E381C" />
          </g>

          {/* Eyes with Interactive Iris Motion and Blinking */}
          <g id="comp-eyes">
            {/* Left Eye */}
            <g id="comp-left-eye">
              <path d="M205 220 Q 220 213 235 220 Q 220 228 205 220 Z" fill="#F1F5F9" />
              {/* Dynamic Pupil */}
              <g transform={`translate(${irisOffset.x}, ${irisOffset.y})`}>
                <ellipse cx="220" cy="220" rx="5.5" ry="5.5" fill="url(#iris-gradient-comp)" />
                <circle cx="220" cy="220" r="2.8" fill="#0A0604" />
                <circle cx="221.5" cy="218.5" r="1.5" fill="#FFFFFF" />
              </g>
              {/* Left Eyelid / Blink Animation */}
              {isBlinking ? (
                <line x1="204" y1="220" x2="236" y2="220" stroke="#BD7A52" stroke-width="6" stroke-linecap="round" />
              ) : (
                <path d="M204 220 Q 220 211 236 220" stroke="#1E1B24" stroke-width="2.6" stroke-linecap="round" fill="none" />
              )}
            </g>

            {/* Right Eye */}
            <g id="comp-right-eye">
              <path d="M265 220 Q 280 213 295 220 Q 280 228 265 220 Z" fill="#F1F5F9" />
              {/* Dynamic Pupil */}
              <g transform={`translate(${irisOffset.x}, ${irisOffset.y})`}>
                <ellipse cx="280" cy="220" rx="5.5" ry="5.5" fill="url(#iris-gradient-comp)" />
                <circle cx="280" cy="220" r="2.8" fill="#0A0604" />
                <circle cx="281.5" cy="218.5" r="1.5" fill="#FFFFFF" />
              </g>
              {/* Right Eyelid / Blink Animation */}
              {isBlinking ? (
                <line x1="264" y1="220" x2="296" y2="220" stroke="#BD7A52" stroke-width="6" stroke-linecap="round" />
              ) : (
                <path d="M264 220 Q 280 211 296 220" stroke="#1E1B24" stroke-width="2.6" stroke-linecap="round" fill="none" />
              )}
            </g>
          </g>

          {/* Eyebrows with Emotional Expression Shifts */}
          <g id="comp-eyebrows">
            <g transform={`translate(0, ${eyebrows.leftY})`}>
              <path d="M202 208 C 210 201, 224 200, 237 206 C 228 205, 214 204, 202 208 Z" fill="#18171C" />
            </g>
            <g transform={`translate(0, ${eyebrows.rightY})`}>
              <path d="M263 206 C 276 200, 290 201, 298 208 C 286 204, 272 205, 263 206 Z" fill="#18171C" />
            </g>
          </g>

          {/* Hair */}
          <g id="comp-hair">
            <path d="M174 205 C 168 180, 172 135, 205 118 C 235 102, 275 102, 305 116 C 332 128, 336 175, 326 205 C 318 190, 316 160, 295 152 C 275 145, 225 145, 205 152 C 185 160, 180 190, 174 205 Z" fill="url(#hair-gradient-comp)" />
            <path d="M185 140 C 200 115, 240 106, 275 108 C 300 110, 320 122, 325 145 C 310 132, 280 124, 250 126 C 220 128, 198 135, 185 140 Z" fill="#4C4857" opacity="0.6" />
            <path d="M174 205 L 178 226 L 184 212 Z" fill="#19181D" />
            <path d="M326 205 L 322 226 L 316 212 Z" fill="#19181D" />
          </g>
        </svg>
      </motion.div>

      {/* Futuristic Online Badge */}
      {showBadge && (
        <div className="absolute bottom-2 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111116]/90 border border-white/10 backdrop-blur-md shadow-glow-primary">
          <span className="w-2 h-2 rounded-full bg-[#00D9FF] animate-ping" />
          <span className="w-2 h-2 rounded-full bg-[#00D9FF]" />
          <span className="text-[10px] font-mono font-medium text-gray-300 uppercase tracking-wider">
            AI_TWIN // {currentExpression}
          </span>
        </div>
      )}
    </div>
  );
};
