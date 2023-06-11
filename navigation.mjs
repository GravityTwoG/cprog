import graphql from "gatsby/graphql.js"
import config from "./config.mjs"

const { GraphQLScalarType, GraphQLInt } = graphql

const CHAPTER_HEADING = "chapter-heading"
const trailingSlash = !!config.gatsby?.trailingSlash // boolean
const ignoreIndex = !!config.sidebar.ignoreIndex // boolean
const { forcedNavOrder = [] } = config.sidebar.forcedNavOrder

function calculateTreeData(pagesArg) {
  const mapped = pagesArg.map(page => {
    const { slug, title } = page.fields
    const { type } = page.frontmatter

    return { slug, title, isChapterHeading: type === CHAPTER_HEADING }
  })

  const pages = ignoreIndex ? mapped.filter(page => page.slug !== "/") : mapped

  // build tree
  const tree = { items: [], label: "" }
  pages.forEach(page => {
    const slugParts = page.slug.split("/")

    const directory = trailingSlash
      ? slugParts.slice(1, -2)
      : slugParts.slice(1, -1)

    const fileIndex = trailingSlash
      ? slugParts.length - 2
      : slugParts.length - 1
    const fileName = slugParts[fileIndex]

    let workDir = tree.items
    // find or create folders subtree
    for (const folderName of directory) {
      const dir = workDir.find(f => f.label === folderName)

      if (!dir) {
        const newFolder = { items: [], label: folderName }
        workDir.push(newFolder)
        workDir = newFolder.items
      } else {
        workDir = dir.items
      }
    }

    const file = workDir.find(f => f.label === fileName)

    if (!file) {
      // add page
      workDir.push({
        label: fileName,
        url: page.slug,
        title: page.title,
        isChapterHeading: page.isChapterHeading,
        items: [],
      })
    } else {
      // if folder/file is already exists, then add url, title, isChapterHeading
      file.url = page.slug
      file.title = page.title
      file.isChapterHeading = page.isChapterHeading
    }
  })

  // merge tree with forcedNavOrder
  const tmp = [...forcedNavOrder].reverse()

  const treeData = tmp.reduce((acc, slug) => {
    const slugParts = slug.split("/")
    const directory = trailingSlash
      ? slugParts.slice(1, -2)
      : slugParts.slice(1, -1)
    const slicedLength = trailingSlash
      ? slugParts.length - 2
      : slugParts.length - 1
    const name = slugParts[slicedLength]

    let workDir = acc.items
    for (const folder of directory) {
      let node = workDir.find(item => item.label === folder)

      if (!node) {
        const newFolder = { label: folder, items: [] }
        workDir.push(newFolder)
      } else {
        workDir = node.items
      }
    }

    const index = workDir.findIndex(({ label }) => label === name)

    if (workDir.length) {
      const node = workDir.splice(index, 1)[0] // remove node
      accu.items.unshift(node) // add node on the first place
    }

    return acc
  }, tree)

  return sortTree(treeData)
}

function sortTree(tree) {
  const sortedItems = tree.items.sort((a, b) => {
    return a.label.localeCompare(b.label, "kn", { numeric: true })
  })

  const finallySortedItems = sortedItems.map(item => {
    if (item.items.length > 0) {
      return sortTree(item)
    }
    return item
  })

  return { ...tree, items: finallySortedItems }
}

function recursivelyFlattenNav(tree) {
  if (tree.items.length) {
    const items = []

    tree.items.forEach(item => {
      const res = recursivelyFlattenNav(item)
      if (Array.isArray(res)) {
        items.push(...res)
      } else {
        items.push(res)
      }
    })

    if (!tree.isChapterHeading) {
      return [{ title: tree.title, url: tree.url }, ...items]
    }

    return items
  }

  return { title: tree.title, url: tree.url }
}

const buildTreeForPath = async getNodes => {
  const pages = getNodes()
    .filter(node => node.internal.type === "Mdx")
    .map(node => ({ fields: node.fields, frontmatter: node.frontmatter }))

  const tree = calculateTreeData(pages)
  const array = recursivelyFlattenNav(tree)
  return { tree, array }
}

export const setFieldsOnGraphQLNodeType = async ({ type, getNodes }) => {
  if (type.name === "Site") {
    return {
      navigation: {
        type: new GraphQLScalarType({
          name: "Navigation",
          serialize(value) {
            return value
          },
        }),
        resolve: () => {
          return buildTreeForPath(getNodes)
        },
      },
      order: {
        type: GraphQLInt,
        result: node => {
          if (node.fields && node.fields.order) {
            return node.fields.order
          }
          return 0
        },
      },
    }
  }

  return {}
}
