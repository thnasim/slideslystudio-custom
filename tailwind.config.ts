import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Slidesly-inspired dark palette
        ink: {
          DEFAULT: '#0A0A0B',
          50: '#18181B',
          100: '#1F1F23',
          200: '#27272A',
        },
        cream: '#F5F1EA',
        accent: {
          DEFAULT: '#FF6B3D', // warm coral
          soft: '#FFB199',
        },
        muted: '#A1A1AA',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3.5rem, 9vw, 8rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'fade-up': 'fade-up 0.6s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
