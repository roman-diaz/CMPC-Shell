/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'color-negro': 'var(--color-negro)',
      },
    },
  },
  plugins: [],
};
