import path from "path"
export { setFieldsOnGraphQLNodeType } from "./navigation.mjs"

const bookTemplate = path.resolve("./src/templates/Book.jsx")

// Create slug and title fields for each node of type Mdx
export const onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "Mdx") {
    const parent = getNode(node.parent)

    let slug = parent.relativePath.replace(parent.ext, "")

    if (slug === "index") {
      slug = ""
    }
    createNodeField({ node, name: "slug", value: `/${slug}` })
    createNodeField({
      node,
      name: "title",
      value: node.frontmatter.title,
    })
  }
}

export const createPages = async ({ graphql, actions, reporter }) => {
  const res = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            type
          }
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  if (res.errors) {
    reporter.panicOnBuild("Error loading MDX result in createPages", res.errors)
  }

  res.data?.allMdx.nodes.forEach(node => {
    if (node.frontmatter.type === "chapter-heading") {
      return
    }

    actions.createPage({
      component: `${bookTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      path: node.fields.slug,
      context: {
        slug: node.fields.slug,
      },
    })
  })
}