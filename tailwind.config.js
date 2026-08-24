/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FFFFFF',
          warm: '#FAF9F5',
          subtle: '#F4F3EE',
          ivory: '#FDFCF7',
          border: '#E8E7E1',
        },
        charcoal: {
          950: '#0C0D0E',
          900: '#121316',
          800: '#1D1F23',
          700: '#2E3138',
          600: '#4B505A',
          400: '#868C98',
          300: '#B0B5C0',
          200: '#D2D5DC',
          100: '#EAEBEF',
          50: '#F7F7F8',
        },
        emerald: {
          brand: '#0B3B2C',
          dark: '#06261C',
          accent: '#105943',
          light: '#EBF4F0',
          subtle: '#F2F8F5',
        },
        gold: {
          brand: '#C5A880',
          accent: '#D4AF37',
          deep: '#9B7E58',
          light: '#F8F5EE',
          border: '#E5DAC9',
        }
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cinzel', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Inter', '-apple-system', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.02em',
        widest: '0.25em',
        mega: '0.35em',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(18, 19, 22, 0.04)',
        'soft-md': '0 8px 24px -4px rgba(18, 19, 22, 0.06)',
        'soft-lg': '0 16px 40px -8px rgba(18, 19, 22, 0.08)',
        'soft-xl': '0 24px 64px -12px rgba(18, 19, 22, 0.10)',
        'emerald-subtle': '0 12px 32px -8px rgba(11, 59, 44, 0.15)',
        'gold-subtle': '0 12px 32px -8px rgba(197, 168, 128, 0.20)',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'editorial': 'cubic-bezier(0.25, 1, 0.5, 1)',
      }
    },
  },
  plugins: [],
};
