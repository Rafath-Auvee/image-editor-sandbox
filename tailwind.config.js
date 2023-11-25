/** @type {import('tailwindcss').Config} */
const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
module.exports = {
  content: {
    files: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/Data/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/fonts/**/*.{js,ts,jsx,tsx,mdx,ttf}",
    ],
  },
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // fontFamily: {
      //   // sans: ["var(--font-satoshi)", ...fontFamily.sans],
      //   sans: ["Spartan-Regular", "var(--font-satoshi)", ...fontFamily.sans],
      //   mono: ["var(--font-fraunces)", ...fontFamily.mono],
      // },
      fontFamily: {
        spartan: ["Spartan-Regular", ...fontFamily.sans], // New utility class: font-spartan
        satoshi: ["var(--font-satoshi)", ...fontFamily.sans], // New utility class: font-satoshi
        sans: [...fontFamily.sans],
        mono: ["var(--font-fraunces)", ...fontFamily.mono],
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#23272A", // Foundation /Blue/blue-500
          secondary: "#4F5255",
          accent: "#E4DE4B", // main button -> Check out the Designs here
          neutral: "#333c4d",
          "base-100": "#ffffff",
          info: "#D5B048", // menu under line color
          success: "#36d399",
          warning: "#CB9F59",
          "Download-Button-100": "#D5B048",
          error: "#EF4444", // error
          "magic-icon": "#CB9F59",
          "black-save-the-date": "#23272A",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
