/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "Roboto", "Arial", "sans-serif"],
        shrikhand: ["Shrikhand"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
