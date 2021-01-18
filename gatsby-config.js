/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
const config = require("./config")

const plugins = [
  "gatsby-plugin-sass",
  "gatsby-plugin-sharp",
  {
    resolve: "gatsby-plugin-svgr",
    options: {
      prettier: true,
      svgo: false,
    },
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `cprog book`,
      short_name: `cprog`,
      start_url: `/`,
      background_color: `#663399`,
      theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `src/images/favicon.svg`,
    },
  },
  "gatsby-plugin-react-helmet",
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "content",
      path: `${__dirname}/content/`,
    },
  },
  {
    resolve: "gatsby-plugin-mdx",
    options: {
      extensions: [".md", ".mdx"],
      gatsbyRemarkPlugins: [
        "gatsby-remark-relative-images",
        {
          resolve: "gatsby-remark-images",
          options: {
            maxWidth: 750,
            linkImagesToOriginal: false,
          },
        },
        {
          resolve:"gatsby-remark-prismjs",
          options: {
            classPrefix: "language-",
            inlineCodeMarker: null,
          }
        }
      ],
      remarkPlugins: [
        require('remark-math'),
        require('remark-html-katex'),
      ],
    },
  },
]

module.exports = {
  pathPrefix: config.gatsby.pathPrefix,
  siteMetadata: {
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    docsLocation: config.siteMetadata.docsLocation,
    ogImage: config.siteMetadata.ogImage,
    favicon: config.siteMetadata.favicon,
    logo: {
      link: config.header.logoLink ? config.header.logoLink : "/",
      image: config.header.logoImage,
    }, // backwards compatible
    headerTitle: config.header.title,
    githubUrl: config.header.githubUrl,
    helpUrl: config.header.helpUrl,
    headerLinks: config.header.links,
    siteUrl: config.gatsby.siteUrl,
  },
  plugins,
}
