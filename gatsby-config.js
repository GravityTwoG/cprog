/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
const config = require("./config")

const plugins = [
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
      extensions: [".md"],
    },
  },
  "gatsby-plugin-sharp",
  {
    resolve: "gatsby-transformer-remark",
    options: {
      plugins: [
        "gatsby-remark-relative-images",
        {
          resolve: "gatsby-remark-images",
          options: {
            maxWidth: 750,
            linkImagesToOriginal: false,
          },
        },
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
      image: config.header.logo,
    }, // backwards compatible
    headerTitle: config.header.title,
    githubUrl: config.header.githubUrl,
    helpUrl: config.header.helpUrl,
    headerLinks: config.header.links,
    siteUrl: config.gatsby.siteUrl,
  },
  plugins,
}
