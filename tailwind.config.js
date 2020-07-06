exports.onCreateWebpackConfig = ({actions, getConfig}) => {
  // Hack debido a Tailwind ^ 1.1.0 usando `reduce-css-calc` que asume node
  // Fuente: https://github.com/bradlc/babel-plugin-tailwind-components/issues/39#issuecomment-526892633
  const config = getConfig();
  config.node = {
      fs: 'empty'
  };
};

module.exports = {
  purge: [],
  theme: {
    fontFamily: {
      // poppins: ["Poppins"],
    },
    extend: {
      colors: {
        p_blue: {
          100: "#E8EEFB",
          200: "#B7C9F1",
          300: "#85A5E8",
          400: "#648CE1",
          500: "#5480DE",
          600: "#4474DB",
          700: "#2556BF",
          800: "#1B408D",
          900: "#12295C",
        },
      },
    },
  },
  variants: {},
  plugins: [],
}