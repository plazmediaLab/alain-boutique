/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const credentials = require('./credentials.js');

module.exports = {
  /* Your site config here */
  plugins: [
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
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        // Acepta todas las opciones definidas por el complemento `babel-plugin-emotion`.
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        // Acepta todas las opciones definidas por el complemento `gatsby-plugin-postcss`.
      },
    },
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
  ],
}
