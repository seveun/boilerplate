/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './ui/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-body)'],
        title: ['var(--font-title)'],
      },
      maxWidth: {
        'screen-xl': '1336px',
      },
      transitionProperty: {
        height: 'height',
      },
      colors: {
        white: '#FFFFFF',
        black: {
          100: '#111316',
          200: '#181B20',
          300: '#1C1F25',
          400: '#2E313B',
        },
        gray: {
          100: '#A7AEBE',
          200: '#828896',
          300: '#6B707D',
          400: '#4A4F5F',
          500: '#3A3C42',
          600: '#2D323C',
          700: '#1F232E',
        },
        green: {
          100: '#00E880',
          200: '#0EB067',
          300: '#0F6F44',
        },
        yellow: {
          100: '#FFD364',
          200: '#FFDD86',
          300: '#78350F',
        },
        red: {
          100: '#FF114A',
          200: '#E30E42',
          300: '#780F2E',
        },
        blue: {
          100: '#5165FF',
          200: '#E5EDFF',
        },
        purple: {
          100: '#E897FE',
        },
      },
    },
  },
  plugins: [],
};

export default config;
