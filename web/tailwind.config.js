/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
      },
      animation: {
        slideUp: "slideUp 1.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
