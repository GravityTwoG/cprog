const React = require("react")
const { Layout } = require("./src/components/Layout")
const { ThemeProvider } = require("./src/components/ThemeProvider")
const { PwaProvider } = require("./src/components/PwaProvider")

exports.wrapRootElement = ({ element }) => {
  return (
    <PwaProvider>
      <ThemeProvider>{element}</ThemeProvider>
    </PwaProvider>
  )
}

exports.wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Layout {...props}>{element}</Layout>
}
