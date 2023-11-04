/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': '#005DB2',
        'secondary': '#1991FF',
        'accent': '#2F3136',
        'text': '#70B7F8',
        'input': '#17181A'
      }
    },
  },
  plugins: [],
}

