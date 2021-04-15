import React, { useState } from "react"

import { StyledListItem } from "./items"
import { TreeNodeTitle } from "./TreeNodeTitle"
import config from "../../../config"

export const TreeNode = React.memo(
  ({
    className = "",
    url,
    title,
    items,
    notCollapsedDepth,
    location,
    isChapterHeading = false,
  }) => {
    const active = isNodeActive(location, url)

    const calculatedClassName = `${className} item ${active ? "active" : ""}`
    const [isCollapsed, setIsCollapsed] = useState(notCollapsedDepth == 0)
    const collapse = () => setIsCollapsed(c => !c)

    const hasChildren = items.length !== 0
    return (
      <StyledListItem className={calculatedClassName}>
        <TreeNodeTitle
          title={title}
          url={url}
          collapse={collapse}
          isCollapsed={isCollapsed}
          isChapterHeading={isChapterHeading}
          hasChildren={hasChildren}
          active={active}
          notCollapsedDepth={notCollapsedDepth}
        />

        {!isCollapsed && hasChildren ? (
          <ul>
            {items.map(item => (
              <TreeNode
                key={item.url}
                location={location}
                notCollapsedDepth={notCollapsedDepth - 1}
                items={item.items}
                url={item.url}
                isChapterHeading={item.isChapterHeading}
                title={item.title}
              />
            ))}
          </ul>
        ) : null}
      </StyledListItem>
    )
  }
)

const isNodeActive = (location, url) => {
  if (!location) return false
  if (
    location.pathname === url ||
    location.pathname === config.gatsby.pathPrefix + url
  ) {
    return true
  }
  if (
    location.pathname === `${url}/` ||
    location.pathname === config.gatsby.pathPrefix + `${url}/`
  ) {
    return true
  }

  return false
}
