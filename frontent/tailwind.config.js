/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main':'#ff1c82',
        'bghover':'#0E0E0E',
      }
    },
  },
  plugins: [],
}