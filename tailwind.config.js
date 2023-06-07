/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      'purple-theme': "#222849"
    }
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
});
