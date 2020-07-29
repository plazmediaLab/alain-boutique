/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const tailwindcss = require("tailwindcss");
const credentials = require('./credentials.js');

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [tailwindcss]
      }
    },
    // { 
    //   resolve: `gatsby-plugin-purgecss`,
    //   options: {
    //     printRejected: true, // Print removed selectors and processed file names
    //     // develop: true, // Enable while using `gatsby develop`
    //     tailwind: true, // Enable tailwindcss support
    //     // whitelist: ['whitelist'], // Don't remove this selector
    //     // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
    //     // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
    //   }
    // },
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: credentials.apiKey,
          authDomain: credentials.authDomain,
          databaseURL: credentials.databaseURL,
          projectId: credentials.projectId,
          storageBucket: credentials.storageBucket,
          messagingSenderId: credentials.messagingSenderId,
          appId: credentials.appId,
          measurementId: credentials.measurementId
        }
      }
    },
    // {
    //   resolve: ``,
    //   options: {
    //     // Acepta todas las opciones definidas por el complemento `gatsby-plugin-postcss`.
    //   },
    // },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Noto Sans JP\:300,400,500,900` // you can also specify font weights and styles
        ],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    }
  ]
}
