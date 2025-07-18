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
        // Establecemos Montserrat como la fuente 'sans' por defecto
        // Y la única fuente definida aquí para simplificar
        sans: ['Montserrat', 'sans-serif'], 
        // Eliminamos 'playfair' ya que no la usaremos más para títulos
        // playfair: ['Playfair Display', 'serif'], 
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
    },
  },
  plugins: [],
}