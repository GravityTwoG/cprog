import React, { useContext, useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"
import config from "../../config"

const NavigationContext = React.createContext({
  tree: { items: [] },
  array: [],
})

export const NavigationProvider = ({ children }) => {
  const { allMdx } = useStaticQuery(graphql`
    query NavigationQuery {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              type
            }
            fields {
              slug
              title
            }
          }
        }
      }
    }
  `)

  const [state, setState] = useState({
    tree: { items: [] },
    array: [],
  })

  useEffect(() => {
    const tree = calculateTreeData(allMdx.edges)
    const array = recursiveFlattenNav(tree)
    setState({ tree, array })
  }, [allMdx])

  return (
    <NavigationContext.Provider value={state}>
      {children}
    </NavigationContext.Provider>
  )
}

export const useNavigationTree = () => {
  const { tree } = useContext(NavigationContext)
  return tree
}
export const useNavigationArray = () => {
  const { array } = useContext(NavigationContext)
  return array
}

function calculateTreeData(edges) {
  const originalData = config.sidebar.ignoreIndex
    ? edges.filter(({ node }) => node.fields.slug !== "/")
    : edges

  const tree = originalData.reduce(
    (accu, { node }) => {
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
