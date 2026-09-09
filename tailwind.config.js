/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#059669', // emerald-600
        secondary: '#14b8a6', // teal-500
      }
    },
  },
  plugins: [],
}
