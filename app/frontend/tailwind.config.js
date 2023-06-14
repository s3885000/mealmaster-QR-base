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
        secondary2: '#FFF4E7',
        tertiary: '#F7F7F8',
        placeholders: '#8D8D8D',
        
        fontFamily: {
          'montserrat': ['Montserrat', 'sans-serif'],
        },
        fontSize: {
          '32px': '32px',
        },
        lineHeight: {
          '39px': '39px',
        },
        letterSpacing: {
          '0.5px': '0.5px',
        },
        fontWeight: {
          '700': '700',
        },
    },
  },
  plugins: ['@tailwindcss/typography'],
}
}