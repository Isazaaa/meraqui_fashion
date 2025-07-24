/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black-meraqui': '#000000',
        'blue-serene': '#305f7f',
        'light-gray-meraqui': '#C2C6C8',
        'white-custom': '#ffffff', 
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'], 
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'opacity': 'opacity',
        'transform': 'transform',
      },
      transitionTimingFunction: {
        'ease-in-out-expo': 'cubic-bezier(0.85, 0, 0.15, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '500': '500ms',
      },
      backdropBlur: {
        md: '10px',
      },
      keyframes: {
        'bounce-once': { // Mantenemos esta si la usas en otro lugar
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        // NUEVO: Animación de pulsación más pronunciada
        'pulse-slight': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.04)' }, // Aumenta el escalado (antes 1.02)
        },
        // Opcional: Si quieres un efecto de rebote vertical tipo botón
        'bounce-cta': {
          '0%, 100%': { transform: 'translateY(0)' },
          '25%': { transform: 'translateY(-5px)' },
          '50%': { transform: 'translateY(0)' },
          '75%': { transform: 'translateY(-2px)' },
        }
      },
      animation: {
        'bounce-once': 'bounce-once 0.3s ease-in-out', 
        'pulse-slight': 'pulse-slight 2s infinite ease-in-out', 
        'bounce-cta': 'bounce-cta 1s ease-in-out infinite' // Animación de rebote más corta
      }
    },
  },
  plugins: [],
}