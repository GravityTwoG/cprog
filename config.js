const config = {
  author: {
    githubUrl: "https://github.com/GravityTwoG",
    githubNickname: "GravityTwoG",
  },
  gatsby: {
    pathPrefix: "/",
    siteUrl: "https://github.com/GravityTwoG/cprog",
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logoLink: "/",
    logoImage: "",
    title: "",
    githubUrl: "https://github.com/GravityTwoG/cprog",
    helpUrl: "",
    links: [{ text: "", link: "" }],
  },
  sidebar: {
    forcedNavOrder: ["/", "/book"],
    notCollapsedDepth: 2,
    links: [
      {
        text: "Cprog — оригинальный сайт",
        link: "http://ermak.cs.nstu.ru/cprog/html/",
      },
    ],
    ignoreIndex: false,
  },
  siteMetadata: {
    title: "Cprog",
    description: "",
    ogImage: "",
    favicon: "",
    docsLocation: "https://github.com/GravityTwoG/cprog/blob/master/content",
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
