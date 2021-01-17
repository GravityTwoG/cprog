const config = require("./config");
const { GraphQLScalarType, GraphQLInt } = require('gatsby/graphql');

function calculateTreeData(pages) {
  const originalData = config.sidebar.ignoreIndex
    ? pages.filter(( node ) => node.fields.slug !== "/")
    : pages

  const tree = originalData.reduce(
    (accu, node ) => {
      const { slug, title } = node.fields
      const parts = slug.split("/")
      const isChapterHeading = node.frontmatter.type === "chapter-heading"

      const slicedParts =
        config.gatsby && config.gatsby.trailingSlash
          ? parts.slice(1, -2)
          : parts.slice(1, -1)

      let { items: prevItems } = accu
      for (const part of slicedParts) {
        let tmp = prevItems && prevItems.find(({ label }) => label === part)

        if (tmp) {
          if (!tmp.items) {
            tmp.items = []
          }
        } else {
          tmp = { label: part, items: [] }
          prevItems.push(tmp)
        }
        prevItems = tmp.items
      }

      const slicedLength =
        config.gatsby && config.gatsby.trailingSlash
          ? parts.length - 2
          : parts.length - 1

      const existingItem = prevItems.find(
        ({ label }) => label === parts[slicedLength]
      )

      if (existingItem) {
        existingItem.url = slug
        existingItem.title = title
        existingItem.isChapterHeading = isChapterHeading
      } else {
        prevItems.push({
          label: parts[slicedLength],
          url: slug,
          isChapterHeading,
          items: [],
          title: title || "Undefined",
        })
      }
      return accu
    },
    { items: [] }
  )

  const {
    sidebar: { forcedNavOrder = [] },
  } = config

  const tmp = [...forcedNavOrder]
  tmp.reverse()

  const treeData = tmp.reduce((accu, slug) => {
    const parts = slug.split("/")

    let { items: prevItems } = accu

    const slicedParts =
      config.gatsby && config.gatsby.trailingSlash
        ? parts.slice(1, -2)
        : parts.slice(1, -1)

    for (const part of slicedParts) {
      let tmp = prevItems.find(item => item && item.label === part)

      if (tmp) {
        if (!tmp.items) {
          tmp.items = []
        }
      } else {
        tmp = { label: part, items: [] }
        prevItems.push(tmp)
      }
      if (tmp && tmp.items) {
        prevItems = tmp.items
      }
    }

    const slicedLength =
      config.gatsby && config.gatsby.trailingSlash
        ? parts.length - 2
        : parts.length - 1

    const index = prevItems.findIndex(
      ({ label }) => label === parts[slicedLength]
    )

    if (prevItems.length) {
      accu.items.unshift(prevItems.splice(index, 1)[0])
    }
    return accu
  }, tree)

  return sortTreeData(treeData)
}

function sortTreeData(tree) {
  const sortedItems = tree.items.sort((a, b) => {
    return a.label.localeCompare(b.label, "kn", { numeric: true })
  })

  const finallySortedItems = sortedItems.map(item => {
    if (item.items.length > 0) {
      return sortTreeData(item)
    }
    return item
  })

  return { ...tree, items: finallySortedItems }
}

function recursiveFlattenNav(tree) {
  if (tree.items.length) {
    const items = []

    tree.items.forEach(t => {
      const res = recursiveFlattenNav(t)
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


const buildTreeForPath = async(getNodes) => {
  const pages = getNodes()
    .filter(node => node.internal.type === 'Mdx')
    .map(node => ({fields: node.fields, frontmatter: node.frontmatter}));
  const tree = calculateTreeData(pages);
  const array = recursiveFlattenNav(tree)
  return {tree, array};
};

module.exports.setFieldsOnGraphQLNodeType = async({ type, getNodes }) => {
  if (type.name === 'Site') {
    return {
      navigation: {
        type: new GraphQLScalarType({
          name: 'Navigation',
          serialize(value) {
            return value;
          }
        }),
        resolve: () => {
          return buildTreeForPath(getNodes);
        }
      },
      order: {
        type: GraphQLInt,
        result: (node) => {
          if(node.fields && node.fields.order) {
            return node.fields.order;
          }
          return 0;
        }
      }
    };
  }

  return {};
};