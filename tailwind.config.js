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
          dark: '#1b1e21'
        },
        volt: '#caf558'
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
