/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        // xs: "0.8rem",
        // sm: "0.9rem",
      },
      fontWeight: {
        hairline: "100",
        extralight: "200",
        light: "300",
        normal: "300",
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
