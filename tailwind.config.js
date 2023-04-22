/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: { 
          DEFAULT: '#2b2c2f',
          dark: '#1b1e21',
          border: '#edeee7',
          "border-dark": '#1c1d1f'
        },
        volt: {
          DEFAULT: '#caf558',
          light: '#f9faf5'
        }
      }
    },
    fontFamily: {
      'sans': ['Poppins', 'sans-serif']
    },
    container: {
      center: true,
      padding: '1rem',
    },
  },
  darkMode: 'class',
  plugins: [],
}
