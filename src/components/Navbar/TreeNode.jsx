import React, { useState } from "react"
import { styled } from "@linaria/react"

import { StyledListItem } from "./ListItem"
import { TreeNodeTitle } from "./TreeNodeTitle"
import config from "../../../config"

const StyledChildrenList = styled.ul`
  border-left: 2px solid var(--decoColor);
  margin-left: 1rem;
`

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
        />

        {hasChildren && !isCollapsed ? (
          <StyledChildrenList>
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
          </StyledChildrenList>
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
