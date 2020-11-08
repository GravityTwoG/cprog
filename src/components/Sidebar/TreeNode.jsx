import React from "react"
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
  padding-left: 1.5rem;
  cursor: pointer;

  & > svg {
    width: 20px;
    height: 20px;
    transform: rotate(0deg);
    transform-origin: center;
    transition: rotate 0.3s ease-in-out;
  }
  &[data-is-active="true"] > svg {
    fill: #fff;
  }
  &[data-is-collapsed="true"] > svg {
    transform: rotate(-90deg);
  }
`

export const TreeNode = React.memo(
  ({ className = "", setCollapsed, collapsed, url, title, items }) => {
    const isCollapsed = collapsed[url]

    const collapse = () => {
      setCollapsed(url)
    }

    const hasChildren = items.length !== 0

    let location

    if (typeof document != "undefined") {
      location = document.location
    }
    const active =
      location &&
      (location.pathname === url ||
        location.pathname === config.gatsby.pathPrefix + url)

    const calculatedClassName = `${className} item ${active ? "active" : ""}`

    return (
      <StyledListItem className={calculatedClassName}>
        {title && (
          <Link to={url}>
            {title}
            {!config.sidebar.frontLine && title && hasChildren ? (
              <ArrowButton
                onClick={collapse}
                aria-label="collapse"
                data-is-active={active}
                data-is-collapsed={isCollapsed}
              >
                <OpenedSvg />
              </ArrowButton>
            ) : null}
          </Link>
        )}

        {!isCollapsed && hasChildren ? (
          <ul>
            {items.map((item, index) => (
              <TreeNode
                key={item.url + index.toString()}
                setCollapsed={setCollapsed}
                collapsed={collapsed}
                {...item}
              />
            ))}
          </ul>
        ) : null}
      </StyledListItem>
    )
  }
)
