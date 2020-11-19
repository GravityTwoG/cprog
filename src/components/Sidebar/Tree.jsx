import React, { useState } from "react"
import config from "../../../config"
import { TreeNode } from "./TreeNode"

export const Tree = ({ edges }) => {
  const [treeData] = useState(() => {
    return calculateTreeData(edges)
  })

  return (
    <TreeNode
      className="firstLevel"
      notCollapsedDepth={config.sidebar.notCollapsedDepth || 1}
      {...treeData}
    />
  )
}

const calculateTreeData = edges => {
  const originalData = config.sidebar.ignoreIndex
    ? edges.filter(({ node }) => node.fields.slug !== "/")
    : edges

  const tree = originalData.reduce(
    (accu, { node }) => {
      const { slug, title } = node.fields
      const parts = slug.split("/")

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
      } else {
        prevItems.push({
          label: parts[slicedLength],
          url: slug,
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
