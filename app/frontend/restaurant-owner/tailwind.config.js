/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '14': '3.5rem',
        '15': '3.75rem',
        '16': '4rem', 
        '17': '4.25rem', 
        '18': '4.5rem', 
        '19': '4.75rem',
        '20': '5rem',
      },
      width: {
        '299': '299px',
        '267': '267px',
        '15': '15rem',
        '22': '5.25rem',
      },
      height: {
        '120': '120px',
      },
      colors: {
        primary: '#22BB9B',
        primary2: '#E9F8F5',
        tertiary: '#F7F7F8',
        placeholders: '#8D8D8D',
        gray: '#C9C9C9',
        error:'#E45851',
        orange: '#FF9012',
      },
      fontFamily: {
        'montserrat': ['Montserrat'],
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
      }
    },
  },
  plugins: ['@tailwindcss/typography'],
}
