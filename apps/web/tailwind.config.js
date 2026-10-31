/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        'background-secondary': '#0A0A0D',
        surface: '#111116',
        'surface-elevated': '#18181F',
        border: 'rgba(255, 255, 255, 0.10)',
        'border-focus': 'rgba(168, 85, 247, 0.5)',
        primary: {
          DEFAULT: '#A855F7',
          hover: '#9333EA',
          glow: 'rgba(168, 85, 247, 0.35)',
        },
        secondary: {
          DEFAULT: '#00D9FF',
          hover: '#00B8D9',
          glow: 'rgba(0, 217, 255, 0.35)',
        },
        highlight: '#C4B5FD',
        muted: '#71717A',
        'text-primary': '#FFFFFF',
        'text-secondary': '#A1A1AA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 30px rgba(168, 85, 247, 0.25)',
        'glow-secondary': '0 0 30px rgba(0, 217, 255, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}
