/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
  safelist: [
    'absolute',
    '-top-11',
    '-bottom-11',
    'left-0',
    'bg-gray-900',
    'text-white',
    'p-2',
    'rounded',
    'text-xs',
    'z-10',
    'font-medium',
    'w-auto',
    'h-auto',
  ],
};
