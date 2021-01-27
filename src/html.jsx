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
              const isDarkThemeActive = JSON.parse(window.localStorage.getItem("isDarkThemeActive"))
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
          href={withPrefix("/global-styles.css")}
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ("fonts" in document) {
                let RobotoRegular = new FontFace(
                  "Roboto",
                  "url(/fonts/roboto-v20-latin_cyrillic-regular.woff2) format('woff2')"
                );
                let Roboto500 = new FontFace(
                  "Roboto",
                  "url(/fonts/roboto-v20-latin_cyrillic-500.woff2) format('woff2')",
                  {
                    weight: "500"
                  }
                );
                let Roboto700 = new FontFace(
                  "Roboto",
                  "url(/fonts/roboto-v20-latin_cyrillic-700.woff2) format('woff2')",
                  {
                    weight: "700"
                  }
                );

                let loadedFonts = Promise.all([
                  RobotoRegular.load(),
                  Roboto500.load(),
                  Roboto700.load()
                ]).then(result => {
                  result.forEach(font => document.fonts.add(font));
                  document.documentElement.classList.add('fonts-loaded');

                  // Used for repeat views
                  sessionStorage.foutFontsStage2Loaded = true;
                }).catch(error => {
                  throw new Error('Error caught: ' + error);
                });
              }
            `,
          }}
        />

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
