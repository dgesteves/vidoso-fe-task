const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

// On a real project, design system specs like complete color palette, typography, animation, sizes, etc. would be defined here.
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#e8f0f9',
          200: '#c0cae8',
          300: '#8ba9e8',
          400: '#6f95d7',
          500: '#5384d8',
          600: '#436eca',
          700: '#3e66b2',
          800: '#2a4880',
          900: '#293e78',
        },
        secondary: {
          100: '#f9f9f9',
          200: '#f5f5f5',
          300: '#f0f0f0',
          400: '#cccccc',
          500: '#8e8e8e',
          600: '#6a6a6a',
          700: '#454545',
          800: '#212121',
          900: '#1a1a1a',
        },
      },
    },
  },
  plugins: [],
};
