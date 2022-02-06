module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        man: ["Manrope, sans-serif"],
      },
      height: {
        90: "90vh",
        88: "88vh",
        "30rem": "30rem",
      },
      colors: {
        dark: "#424242",
        card: "#F4F4F4",
      },
      backgroundSize: {
        200: "200px",
      },
      screens: {
        mb: { max: "420px" },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
