const React = require("react")
require("prismjs/themes/prism-tomorrow.css")
const { MDXProvider } = require("@mdx-js/react")

const { Layout } = require("./src/components/Layout")
const { ThemeProvider } = require("./src/components/ThemeProvider")
const { PwaProvider } = require("./src/components/PwaProvider")
const mdxComponents = require("./src/components/mdxComponents").mdxComponents

exports.wrapRootElement = ({ element }) => {
  return (
    <PwaProvider>
      <ThemeProvider>
        <MDXProvider components={mdxComponents}>{element}</MDXProvider>
      </ThemeProvider>
    </PwaProvider>
  )
}
exports.wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Layout {...props}>{element}</Layout>
}
