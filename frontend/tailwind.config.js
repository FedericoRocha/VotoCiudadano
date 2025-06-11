/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Habilita el modo oscuro basado en clases
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores de la bandera de Argentina
        'arg-blue': {
          light: '#75AADB',
          DEFAULT: '#5C8FBF',
          dark: '#3A6B9A'
        },
        'arg-gold': {
          light: '#FFE082',
          DEFAULT: '#FFD54F',
          dark: '#FFC107'
        },
      },
    },
  },
  plugins: [],
}
