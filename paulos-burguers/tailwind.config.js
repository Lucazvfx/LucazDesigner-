/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        coffee: {
          900: '#0d0704',
          800: '#120a05',
          700: '#1a120b',
          600: '#251710',
          500: '#332115',
        },
        flame: {
          400: '#ff9d2e',
          500: '#f5821f',
          600: '#d96a10',
        },
        gold: {
          400: '#e8c860',
          500: '#d4af37',
          600: '#a8862a',
        },
        ketchup: '#c8102e',
      },
      fontFamily: {
        display: ['"Rubik Dirt"', '"Anton"', 'Impact', 'system-ui', 'sans-serif'],
        heading: ['Anton', '"Arial Narrow"', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        flame: '0 0 40px -8px rgba(245, 130, 31, 0.55)',
        gold: '0 0 32px -6px rgba(212, 175, 55, 0.5)',
        card: '0 24px 60px -30px rgba(0, 0, 0, 0.9)',
      },
      backgroundImage: {
        'radial-flame':
          'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(245,130,31,0.35) 0%, rgba(245,130,31,0.10) 35%, rgba(18,10,5,0) 70%)',
        'gold-sheen':
          'linear-gradient(100deg, #a8862a 0%, #e8c860 30%, #fff6d6 45%, #d4af37 60%, #a8862a 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -18px, 0)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0)', opacity: '0' },
          '15%': { opacity: '0.7' },
          '100%': { transform: 'translate3d(0, -120px, 0)', opacity: '0' },
        },
        sheen: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        drift: 'drift linear infinite',
        sheen: 'sheen 6s linear infinite',
        'pulse-glow': 'pulseGlow 3.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
