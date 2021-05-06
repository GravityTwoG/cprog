const config = require("./config")

const plugins = [
  "gatsby-plugin-sass",
  "gatsby-plugin-sharp",
  "gatsby-remark-images",
  {
    resolve: "gatsby-plugin-svgr",
    options: {
      prettier: true,
      svgo: false,
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
        {
          resolve: "gatsby-remark-images",
          options: {
            maxWidth: 1200,
            showCaptions: true,
            backgroundColor: "transparent",
          },
        },
        {
          resolve: "gatsby-remark-prismjs",
          options: {
            classPrefix: "language-",
            inlineCodeMarker: null,
          },
        },
      ],
    },
  },
  "gatsby-plugin-preact",
  "gatsby-plugin-linaria",
]

// check and add pwa functionality
if (
  process.env.NODE_ENV == "production" &&
  config.pwa &&
  config.pwa.enabled &&
  config.pwa.manifest
) {
  plugins.push({
    resolve: `gatsby-plugin-manifest`,
    options: { ...config.pwa.manifest },
  })
  plugins.push({
    resolve: "gatsby-plugin-offline",
    options: {
      globPatterns: ["**/icons/*"],
    },
  })
} else {
  plugins.push("gatsby-plugin-remove-serviceworker")
}

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
