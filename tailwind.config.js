/** @type {import('tailwindcss').Config} */
export default {
  content: [ 
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-light-blue': '#40B7D1',
        'custom-deep-blue': '#5A7CD2',
        'custom-purple': '#773DD3',
      },
      backgroundImage: {
        'full-gradient': 'linear-gradient(to right, #773DD3, #40B7D1)',
      },
  
    },
  },
  plugins: [],
}

