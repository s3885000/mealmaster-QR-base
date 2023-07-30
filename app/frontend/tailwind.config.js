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
        gray: '#C9C9C9',
      },
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
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        }
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease-out forwards',
      },
      rotate: {
        '270': '270deg',
      }
    },
  },
  plugins: ['@tailwindcss/typography'],
}
