/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        script: ['"Great Vibes"', 'cursive'],
        letter: ['"Dancing Script"', 'cursive'],
        body: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        blush: { 50: '#FFF5F7', 100: '#FDEEF2', 200: '#F9D9E0', 300: '#F4BCC9' },
        rose: { 400: '#E8799A', 500: '#D85C84', 600: '#BE4670' },
        cream: { 50: '#FFFCF7', 100: '#FFF8EE', 200: '#F7EEDD' },
        gold: { 300: '#E6CC9A', 400: '#D4AF72', 500: '#B8924F' },
        burgundy: { 500: '#8E2A47', 600: '#741F38', 700: '#5C1729' },
      },
      keyframes: {
        'heart-float': {
          '0%': { transform: 'translateY(0) rotate(-8deg)', opacity: '0' },
          '10%': { opacity: '0.7' },
          '90%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-110vh) rotate(12deg)', opacity: '0' },
        },
        'petal-fall': {
          '0%': { transform: 'translateY(-10vh) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '100%': { transform: 'translateY(110vh) translateX(40px) rotate(360deg)', opacity: '0' },
        },
        'scroll-bob': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(216,92,132,0.35)' },
          '50%': { boxShadow: '0 0 24px 6px rgba(216,92,132,0.35)' },
        },
      },
      animation: {
        'heart-float': 'heart-float linear infinite',
        'petal-fall': 'petal-fall linear infinite',
        'scroll-bob': 'scroll-bob 2s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2.4s ease-in-out infinite',
      },
      boxShadow: {
        soft: '0 20px 45px -20px rgba(116, 31, 56, 0.35)',
        glow: '0 0 28px 4px rgba(216, 92, 132, 0.3)',
      },
    },
  },
  plugins: [],
};
