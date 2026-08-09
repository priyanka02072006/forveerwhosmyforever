/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Base cinematic palette — used across every act as the "film stock"
        void: '#08090C',        // near-black base, warmer than pure black
        reel: '#111318',        // panel / card background
        ash: '#7A7E8C',         // muted secondary text on dark
        parchment: '#F3ECDD',   // Open When paper tone
        parchment2: '#E7DCC3',
        ink: '#241F1C',         // handwriting ink on parchment
        ember: '#C4552E',       // shared warm accent (used sparingly, "the 39 color")
        classified: '#1B2B1E',  // vault dark green-black
        signal: '#8FF0A4',      // vault terminal green
        wrapped1: '#FF5C77',
        wrapped2: '#FFC85C',
        wrapped3: '#6C6CFF',
        dream1: '#F6DCE0',
        dream2: '#E8B4BC',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        hand: ['"Caveat"', 'cursive'],
      },
      letterSpacing: {
        widest2: '0.35em',
      },
      keyframes: {
        flicker: {
          '0%,100%': { opacity: 1 },
          '92%': { opacity: 1 },
          '93%': { opacity: 0.4 },
          '94%': { opacity: 1 },
          '96%': { opacity: 0.6 },
          '97%': { opacity: 1 },
        },
        drift: {
          '0%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-16px) translateX(6px)' },
          '100%': { transform: 'translateY(0) translateX(0)' },
        },
        scan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
      },
      animation: {
        flicker: 'flicker 6s ease-in-out infinite',
        drift: 'drift 8s ease-in-out infinite',
        scan: 'scan 6s linear infinite',
      },
    },
  },
  plugins: [],
}
