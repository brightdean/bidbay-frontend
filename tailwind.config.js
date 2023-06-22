/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'pacifico': ['Pacifico', 'cursive'],
        'lobster': ['Lobster', 'cursive'],
        'montserrat': ['Montserrat', 'cursive']
      }
    },
  },
  plugins: [],
}

