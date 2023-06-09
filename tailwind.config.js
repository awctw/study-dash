/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      "purple-theme": "#222849",
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
});
