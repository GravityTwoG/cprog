// const config = require("./config")
import { visit } from "unist-util-visit"
import { dirname } from "path"
import { fileURLToPath } from "url"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import config from "./config.mjs"

const __dirname = dirname(fileURLToPath(import.meta.url))

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
  "gatsby-plugin-react-helmet",
  {
    resolve: "gatsby-plugin-mdx",
    options: {
      extensions: [".md", ".mdx"],
      mdxOptions: {
        remarkPlugins: [remarkMath, remarkGfm],
      },
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
            inlineCodeMarker: "±",
            // If setting this to true, the parser won't handle and highlight inline
            // code used in markdown i.e. single backtick code like `this`.
            noInlineHighlight: false,
          },
        },
      ],
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "content",
      path: `${__dirname}/content/`,
    },
  },
  {
    resolve: "gatsby-plugin-linaria",
    options: {
      extractCritical: true,
    },
  },
  {
    resolve: `gatsby-progress-bar`,
    options: {
      showSpinner: false,
      color: "#3884ff",
    },
  },
  "gatsby-plugin-sitemap",
  {
    resolve: "gatsby-plugin-robots-txt",
    options: {
      host: "https://cprog.netlify.app",
      sitemap: "https://cprog.netlify.app/sitemap.xml",
      policy: [{ userAgent: "*", allow: "/" }],
    },
  },
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
      workboxConfig: {
        globPatterns: ["**/icons/*"],
        runtimeCaching: [
          {
            // page-data.json files, static query results and app-data.json
            // are not content hashed
            urlPattern: /^https?:.*\/page-data\/.*\.json/,
            handler: `NetworkFirst`,
            options: {
              networkTimeoutSeconds: 1,
            },
          },
        ],
      },
    },
  })
} else {
  plugins.push("gatsby-plugin-remove-serviceworker")
}

export default {
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
