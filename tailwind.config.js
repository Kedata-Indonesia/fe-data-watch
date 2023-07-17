/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  important: ['data-table-library_table'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', ...defaultTheme.fontFamily.sans],
        archivo: ['Archivo'],
      },
      colors: {
        'c-neutral-40': '#DFE2E6',
        'c-neutral-900': '#091E42',
        'c-gray-100': '#F4F4F5',
        'c-gray-300': '#D4D4D8',
        'c-gray-400': '#A1A1AA',
        'c-gray-600': '#52525B',
        'c-red-50': '#FFE5EA',
        'c-red-200': '#FFB3C1',
        'c-red-300': '#FF8098',
        'c-red-400': '#FF4C6F',
        'c-red-600': '#FF0031',
      },
    },
  },
  plugins: [require('daisyui'), require('@tailwindcss/forms')],
};
