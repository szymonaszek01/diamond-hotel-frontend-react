/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  mode: 'jit',
  theme: {
    extend: {
      colors: {
        primary: '#00040f',
        secondary: '#d0bf79',
        dimWhite: 'rgba(255, 255, 255, 0.7)',
        dimYellow: '#f1e6c6',
        gray30Percentage: 'rgba(217, 217, 217, 0.3)',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        xxs: '0.6rem',
      },
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    },
  },
  plugins: [],
};
