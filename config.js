const config = {
  gatsby: {
    pathPrefix: "/",
    siteUrl: "https://github.com/GravityTwoG/cprog-gatsby",
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logo: "C",
    logoLink: "/",
    title: "CPROG",
    githubUrl: "https://github.com/GravityTwoG/cprog-gatsby",
    helpUrl: "",
    links: [{ text: "", link: "" }],
  },
  sidebar: {
    forcedNavOrder: ["/", "/book"],
    collapsedNav: [
      // add trailing slash if enabled above
    ],
    links: [
      {
        text: "Cprog — оригинальный сайт",
        link: "http://ermak.cs.nstu.ru/cprog/html/",
      },
    ],
    frontline: false,
    ignoreIndex: false,
  },
  siteMetadata: {
    title: "Cprog | powered by Gatsby",
    description: "Documentation built with mdx. Powering hasura.io/learn ",
    ogImage: null,
    favicon: "https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg",
    docsLocation:
      "https://github.com/GravityTwoG/cprog-gatsby/blob/master/content",
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: "Gatsby Gitbook Starter",
      short_name: "GitbookStarter",
      start_url: "/",
      background_color: "#6b37bf",
      theme_color: "#6b37bf",
      display: "standalone",
      crossOrigin: "use-credentials",
      icons: [
        {
          src: "src/pwa-512.png",
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
}

module.exports = config
