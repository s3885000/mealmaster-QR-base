/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22BB9B',
        primary2: '#E9F8F5',
        secondary: '#FF9012',
        secondary2: '#FFF4E7'
    },
  },
  plugins: [],
}
}
