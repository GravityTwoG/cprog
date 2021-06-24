const config = {
  author: {
    githubUrl: "https://github.com/GravityTwoG",
    githubNickname: "GravityTwoG",
  },
  gatsby: {
    pathPrefix: "/",
    siteUrl: "https://cprog.netlify.app",
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
    forcedNavOrder: ["/", "/book", "/tasks"],
    notCollapsedDepth: 1,
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
    description: "Си/Си++. От дилетанта до профессионала",
    ogImage: "src/images/favicon.svg",
    favicon: "src/images/favicon.svg",
    docsLocation: "https://github.com/GravityTwoG/cprog/blob/master/content",
  },
  pwa: {
    enabled: true, // disabling this will also remove the existing service worker.
    manifest: {
      name: "Cprog",
      short_name: "Cprog",
      start_url: "/",
      background_color: "#fff",
      theme_color: "#fff",
      display: "standalone",
      crossOrigin: "use-credentials",
      icon: "src/images/favicon.png",
      icon_options: {
        purpose: "any maskable",
      },
      include_favicon: true,
      theme_color_in_head: false,
      cache_busting_mode: "none",
    },
  },
}

module.exports = config
