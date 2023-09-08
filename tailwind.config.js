/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'health-blue-thin': '#76A6D7',
        'health-blue-light': '#9CCBFB',
        'health-blue-reguler': '#286DA8',
        'health-blue-medium': '#1F4E78',
        'health-blue-dark': '#004878',
        'health-red-light': '#A82828',
        'health-red-dark': '#6F1C1C',
      },
      fontFamily: {
        regular: ['Poppins-Regular'],
        medium: ['Poppins-Medium'],
        italic_medium: ['Poppins-Medium-Italic'],
        semibold: ['Poppins-Semibold'],
        bold: ['Poppins-Bold'],
        lato_regular: ['Lato-Regular'],
        lato_black: ['Lato-Black'],
        lato_bold: ['Lato-Bold'],
        lato_italic: ['Lato-Italic'],
      },
      borderRadius: {
        'bb-left-right': '0 0 50px 50px',
      },
    },
  },
  plugins: [],
};
