const path = require("path")
const { setFieldsOnGraphQLNodeType } = require("./navigation")

module.exports.setFieldsOnGraphQLNodeType = setFieldsOnGraphQLNodeType

// Create slug and title fields for each file
module.exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const parent = getNode(node.parent)

    let slug = parent.relativePath.replace(parent.ext, "")

    if (slug === "index") {
      slug = ""
    }
    createNodeField({ node, name: "slug", value: `/${slug}` })
    createNodeField({
      name: "title",
      node,
      value: node.frontmatter.title,
    })
  }
}

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const bookTemplate = path.resolve("./src/templates/Book.jsx")

  const res = await graphql(`
    query {
      allMdx {
        edges {
          node {
            frontmatter {
              type
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  res.data.allMdx.edges.forEach(edge => {
    if (edge.node.frontmatter.type === "chapter-heading") {
      return
    }
    createPage({
      component: bookTemplate,
      path: edge.node.fields.slug,
      context: {
        slug: edge.node.fields.slug,
      },
    })
  })
}
