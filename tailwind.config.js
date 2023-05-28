/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: { brand: "#5C8984" },
    },
  },
  plugins: [require("daisyui")],
};
