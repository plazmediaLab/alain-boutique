module.exports = {
  // purge: [],
  theme: {
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
        carbon: {
          100: "#D4D6D7",
          200: "#B5B9BB",
          300: "#8C9295",
          400: "#656B6D",
          500: "#494D4F",
          600: "#2C2F30",
          700: "#232526",
          800: "#1A1B1C",
          900: "#070707",
        },
        bluegray: {
          100: "#E8ECEF",
          200: "#D0DADF",
          300: "#A2B5BF",
          400: "#688797",
          500: "#607D8B",
          600: "#58737F",
          700: "#40535D",
          800: "#303E45",
          900: "#181F23",
        },
        background: "#ECF0F3",
      },
    },
  },
  variants: {},
  plugins: [],
}


// exports.onCreateWebpackConfig = ({actions, getConfig}) => {
//   // Hack debido a Tailwind ^ 1.1.0 usando `reduce-css-calc` que asume node
//   // Fuente: https://github.com/bradlc/babel-plugin-tailwind-components/issues/39#issuecomment-526892633
//   const config = getConfig();
//   config.node = {
//       fs: 'empty'
//   };
// };

// module.exports = {
//   purge: {
//     // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
//     // enabled: process.env.NODE_ENV === 'production',
//     // content: [
//     //   'src/*.jsx',
//     //   'src/*.js',
//     //   'src/*.css'
//     // ]
//   },
//   theme: {
//     fontFamily: {
//       // poppins: ["Poppins"],
//     },
//   },
//   variants: {},
//   plugins: [],
// }