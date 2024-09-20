/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#9E9E9F",
          200: "#8C8C8E",
          300: "#7A7A7C",
          400: "#68686A",
          500: "#58585A",
          600: "#48484A",
          700: "#3A3A3C",
          800: "#2C2C2E",
          900: "#1C1C1E",
        },
      },
      fontSize: {
        xss: "0.6rem",
        xs: "0.75rem",
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
      fontWeight: {
        hairline: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "400",
        semibold: "500",
        bold: "600",
        "extra-bold": "800",
        black: "900",
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-100%)", opacity: "0" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "20%": { transform: "translateX(0)", opacity: "1" },
          "80%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        slideUp: "slideUp 1s ease-out forwards",
        slideDown: "slideDown 0.5s ease-out",
        slideDownThenUp:
          "slideDown 0.5s ease-out, slideUp 1s ease-out 3s forwards",
        slideInRight: "slideInRight 5s ease-in-out forwards",
        fadeIn: "fadeIn 1s ease-in forwards",
        fadeOut: "fadeOut 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};
