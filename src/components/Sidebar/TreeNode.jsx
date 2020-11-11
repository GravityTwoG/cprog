import React, { useState } from "react"
import OpenedSvg from "../../images/opened"
import config from "../../../config"
import { StyledListItem } from "./items"
import { Link } from "../Link"
import styled from "@emotion/styled"

const ArrowButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  margin-left: auto;
  margin-right: 5px;
  padding: 0.5rem;
  cursor: pointer;

  & > svg {
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => (theme.isDark ? "#fff" : "#000")};
    transform: rotate(0deg);
    transform-origin: center;
    transition: transform 0.15s linear;
  }
  &[data-is-active="true"] > svg {
    fill: #fff;
  }
  &[data-is-collapsed="true"] > svg {
    transform: rotate(-90deg);
  }
`

export const TreeNode = React.memo(
  ({ className = "", url, title, items, notCollapsedDepth }) => {
    let location

    if (typeof document != "undefined") {
      location = document.location
    }
    const active =
      location &&
      (location.pathname === url ||
        location.pathname === config.gatsby.pathPrefix + url)

    const calculatedClassName = `${className} item ${active ? "active" : ""}`
    const [isCollapsed, setIsCollapsed] = useState(!notCollapsedDepth > 0)
    const collapse = () => {
      setIsCollapsed(c => !c)
    }
    const hasChildren = items.length !== 0
    return (
      <StyledListItem className={calculatedClassName}>
        <div className="tree-node-title">
          {title && <Link to={url}>{title}</Link>}
          {title && hasChildren && !config.sidebar.frontLine ? (
            <ArrowButton
              onClick={collapse}
              aria-label="collapse"
              data-is-active={active}
              data-is-collapsed={isCollapsed}
            >
              <OpenedSvg />
            </ArrowButton>
          ) : null}
        </div>

        {!isCollapsed && hasChildren ? (
          <ul>
            {items.map((item, index) => (
              <TreeNode
                key={item.url + index.toString()}
                {...item}
                notCollapsedDepth={notCollapsedDepth - 1}
              />
            ))}
          </ul>
        ) : null}
      </StyledListItem>
    )
  }
)
