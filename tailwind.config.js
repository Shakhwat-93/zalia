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
        zalia: {
          forest: '#07381E',
          'forest-hover': '#052B17',
          'forest-dark': '#041F11',
          'forest-soft': '#EBF2EE',
          'forest-subtle': 'rgba(7, 56, 30, 0.06)',
          'forest-border': 'rgba(7, 56, 30, 0.12)',
          'forest-border-strong': 'rgba(7, 56, 30, 0.24)',
          surface: '#FFFFFF',
          'surface-alt': '#F7F8F6',
          'surface-warm': '#F5F3EE',
          text: '#111713',
          'text-muted': '#5F6661',
        },
        canvas: {
          DEFAULT: '#FFFFFF',
          warm: '#F7F8F6',
          subtle: '#F5F3EE',
          ivory: '#FDFCF7',
          border: 'rgba(7, 56, 30, 0.12)',
        },
        charcoal: {
          950: '#0C0D0E',
          900: '#111713',
          800: '#1D211E',
          700: '#2E3531',
          600: '#4B534E',
          500: '#5F6661',
          400: '#848B86',
          300: '#B0B6B2',
          200: '#D2D7D4',
          100: '#EAECEB',
          50: '#F7F8F6',
        },
        emerald: {
          brand: '#07381E',
          dark: '#052B17',
          accent: '#0C4E2B',
          light: '#EBF2EE',
          subtle: '#F2F7F4',
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
        sans: ['var(--font-inter)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'Georgia', 'serif'],
      },
      letterSpacing: {
        tightest: '-0.035em',
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0em',
        wide: '0.04em',
        wider: '0.08em',
        widest: '0.14em',
        label: '0.16em',
        caps: '0.18em',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(7, 56, 30, 0.04)',
        'soft-md': '0 8px 24px -4px rgba(7, 56, 30, 0.06)',
        'soft-lg': '0 16px 40px -8px rgba(7, 56, 30, 0.08)',
        'soft-xl': '0 24px 64px -12px rgba(7, 56, 30, 0.10)',
        'emerald-subtle': '0 12px 32px -8px rgba(7, 56, 30, 0.18)',
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