const { GraphQLScalarType, GraphQLInt } = require("gatsby/graphql")
const config = require("./config")

const CHAPTER_HEADING = "chapter-heading"
const trailingSlash = !!config.gatsby?.trailingSlash // boolean
const ignoreIndex = !!config.sidebar.ignoreIndex // boolean
const { forcedNavOrder = [] } = config.sidebar.forcedNavOrder

function calculateTreeData(pagesArg) {
  const pages = []

  for (const page of pagesArg) {
    const mappedPage = {
      slug: page.fields.slug,
      title: page.fields.title,
      isChapterHeading: page.frontmatter.type === CHAPTER_HEADING,
    }

    if (ignoreIndex) {
      if (mappedPage.slug !== "/") {
        pages.push(mappedPage)
      }
    } else {
      pages.push(mappedPage)
    }
  }

  // build tree
  const tree = { items: [], label: "" }
  for (const page of pages) {
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
  }

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
  const items = []

  if (!tree.items.length) {
    return [{ title: tree.title, url: tree.url }]
  }
  if (!tree.isChapterHeading) {
    items.push({ title: tree.title, url: tree.url })
  }

  for (const item of tree.items) {
    const flatChildren = recursivelyFlattenNav(item)
    items.push(...flatChildren)
  }

  return items
}

async function buildTreeForPath(getNodes) {
  const pages = []
  for (const node of getNodes()) {
    if (node.internal.type === "Mdx") {
      pages.push({
        fields: node.fields,
        frontmatter: node.frontmatter,
      })
    }
  }

  const tree = calculateTreeData(pages)
  const array = recursivelyFlattenNav(tree)
  return { tree, array }
}

module.exports.setFieldsOnGraphQLNodeType = async ({ type, getNodes }) => {
  if (type.name !== "Site") {
    return {}
  }

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
        return node.fields?.order ? node.fields.order : 0
      },
    },
  }
}
