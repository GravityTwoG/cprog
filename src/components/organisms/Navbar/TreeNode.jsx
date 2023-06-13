import React, { useState } from "react"
import { styled } from "@linaria/react"

import { TreeNodeTitle } from "./TreeNodeTitle"
import config from "../../../../config"

const StyledChildrenList = styled.ul`
  border-left: 2px solid var(--decoColor);
  margin-left: 1rem;
`

const StyledTreeNode = styled.li`
  list-style: none;
  margin-bottom: 0.5em;

  & > .tree-node-title {
    position: relative;

    &:after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      margin-left: 2rem;
      width: calc(100% - 4rem);
      height: 4px;
      border-radius: 2px;
      background-color: transparent;
    }
  }

  &.active > .tree-node-title:after {
    background-color: var(--accentColor);
  }
  &.active > .tree-node-title > span > a {
    color: var(--accentColor);
  }

  & > .tree-node-title > span > a {
    color: var(--textColor);
    flex-grow: 1;
    display: block;
  }

  & > .tree-node-title > span > a,
  & > a,
  & .chapter-heading {
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? 700 : 500)};
    font-size: 14px;
    padding: 0.45rem 1rem 0.45rem ${props => 2 + (props.level || 0)}rem;
    position: relative;
  }

  ul {
    padding-inline-start: 0;
  }
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
    const [isCollapsed, setIsCollapsed] = useState(notCollapsedDepth === 0)
    const collapse = () => setIsCollapsed(c => !c)

    const hasChildren = items.length !== 0
    return (
      <StyledTreeNode className={calculatedClassName}>
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
      </StyledTreeNode>
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

  return (
    location.pathname === `${url}/` ||
    location.pathname === config.gatsby.pathPrefix + `${url}/`
  )
}
