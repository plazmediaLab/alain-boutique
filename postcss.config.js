// module.exports = {
//   plugins: [
//       require('postcss-import')({
//           plugins: [
//               require('stylelint')
//           ]
//       }),
//       require('tailwindcss'),
//       require('./tailwind.config'),
//       require('postcss-preset-env')({
//           autoprefixer: { grid: false },
//           features: {
//               'nesting-rules': true
//           },
//           browsers: [
//               '> 1%',
//               'last 2 versions',
//               'Firefox ESR',
//           ]
//       })
//   ]
// };
module.exports = () => ({
    plugins: [
        require('tailwindcss'),
    ]
})