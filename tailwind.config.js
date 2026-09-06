/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        marvel: {
          red: '#E62429',
          darkRed: '#991B1B',
          crimson: '#DC2626',
          gold: '#F59E0B',
          goldLight: '#FDE68A',
          goldDark: '#B45309',
          bronze: '#D97706',
          cosmic: '#A855F7',
          violet: '#8B5CF6',
          dark: '#0A0C12',
          darker: '#07080A',
          surface: '#0F1219',
          card: '#131620',
          cardElevated: '#181C28',
          border: 'rgba(255, 255, 255, 0.08)',
          borderStrong: 'rgba(255, 255, 255, 0.16)',
        }
      },
      fontFamily: {
        marvel: ['Outfit', 'Bebas Neue', 'Impact', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'cinematic': '0 14px 40px -8px rgba(0, 0, 0, 0.85), 0 0 1px rgba(255, 255, 255, 0.08)',
        'glow-red': '0 0 20px rgba(230, 36, 41, 0.35)',
        'glow-gold': '0 0 20px rgba(245, 158, 11, 0.35)',
        'glow-violet': '0 0 20px rgba(139, 92, 246, 0.35)',
        'glow-cyan': '0 0 20px rgba(245, 158, 11, 0.25)',
        'glow-blue': '0 0 20px rgba(230, 36, 41, 0.25)',
        'glow-cosmic': '0 0 30px rgba(168, 85, 247, 0.5)',
        'card-elevated': '0 12px 36px -4px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'cosmic-spin': 'spin 12s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        }
      }
    },
  },
  plugins: [],
}
