/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], 
  theme: {
    extend: {
      colors: {
        primary: "#7F56D9",
        secondary: "#F97316",
        tertiary: "#752382",
        extratouch: "#FFD700",
      }
    },
  },
  plugins: [],
}

