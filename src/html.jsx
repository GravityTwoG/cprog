import React from "react"
import PropTypes from "prop-types"
import { withPrefix } from "gatsby"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes} lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              const isDarkThemeActive = window.localStorage.getItem("isDarkThemeActive") === "true"
              document.documentElement.setAttribute('data-theme', isDarkThemeActive ? 'dark' : 'light');
            `,
          }}
        />
        <link
          type="text/css"
          rel="stylesheet"
          href={withPrefix("/media-styles.css")}
        />
        <link
          type="text/css"
          rel="stylesheet"
          href={withPrefix("/media-btw768-991.css")}
          media="all and (min-width: 768px) and (max-width: 991px)"
        />
        <link
          type="text/css"
          rel="stylesheet"
          href={withPrefix("/media-max1023.css")}
          media="all and (max-width: 1023px)"
        />
        <link
          type="text/css"
          rel="stylesheet"
          href={withPrefix("/media-max767.css")}
          media="all and (max-width: 767px)"
        />
        <link
          type="text/css"
          rel="stylesheet"
          href={withPrefix("/global-styles.css")}
        />
        <link
          rel="preload"
          href={withPrefix("/fonts/roboto-latin-cyrillic-regular.woff2")}
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href={withPrefix("/fonts/roboto-latin-cyrillic-500.woff2")}
          as="font"
          type="font/woff2"
        />
        <link
          rel="preload"
          href={withPrefix("/fonts/roboto-latin-cyrillic-700.woff2")}
          as="font"
          type="font/woff2"
        />
        <link
          type="text/css"
          rel="stylesheet"
          href={withPrefix("/fonts/fonts.css")}
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>

        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
