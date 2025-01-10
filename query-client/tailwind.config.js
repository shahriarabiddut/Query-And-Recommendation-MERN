/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "rancho": ["Rancho", "cursive"],
        "barlow": ["Barlow Condensed", "serif"],
      },
      colors: {
        'buttonBG': '#4a86e8', 
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

