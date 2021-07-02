import React, { useState, useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { styled } from "@linaria/react"
import { useMeasure } from "react-use"

import config from "../../../config"

import { ArrowButton } from "../atoms/ArrowButton"

const titleHeight = 36
const padHeight = 8

export const Nav = styled.nav`
  width: 100%;
  margin-bottom: 1rem;
  background: var(--backgroundColor);
  overflow: hidden;
  transition: height 0.2s ease-in-out;

  & .rightSideTitle {
    width: 100%;
    height: ${titleHeight}px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 16px;
    border-radius: 5px;
    border: none;

    font-family: inherit;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    line-height: 1;

    color: var(--textColor);
    cursor: pointer;
    background-color: transparent;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    & > button {
      height: auto;
      margin-right: 0;
    }
  }

  & > ul {
    padding-inline-start: 0;
    transition: opacity 0.2s ease-in-out;
    opacity: 1;
    &[data-is-collapsed="true"] {
      opacity: 0;
    }
  }
`

const StyledListItem = styled.li`
  list-style: none;
  list-style-type: none;
  margin-bottom: 4px;

  border-radius: 5px;
  background-color: transparent;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  & > a {
    display: block;
    padding: 6px 16px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;

    color: var(--textColor);
    text-decoration: none;
    position: relative;

    &:hover {
      color: var(--accentColor) !important;
    }
  }

  @media (max-width: 767px) {
    & > a {
      font-size: 14px;
    }
  }
`

export const ListItem = ({ className, children, ...props }) => {
  return (
    <StyledListItem className={className}>
      <a href={props.to} {...props} children={children} />
    </StyledListItem>
  )
}

export const TableOfContents = ({
  location,
  isDefaultCollapsed = false,
  className,
}) => {
  const { allMdx } = useStaticQuery(graphql`
    query RightSidebarQuery {
      allMdx {
        edges {
          node {
            fields {
              slug
            }
            tableOfContents
          }
        }
      }
    }
  `)

  const [isCollapsed, setIsCollapsed] = useState(isDefaultCollapsed)
  const [contentRef, { height: contentHeight }] = useMeasure()

  const links = useMemo(() => generateLinks(allMdx, location), [
    allMdx,
    location,
  ])
  if (!links.length) return null

  return (
    <Nav
      className={className}
      style={{
        height: titleHeight + (isCollapsed ? 0 : contentHeight + padHeight),
      }}
    >
      <button
        className={"rightSideTitle"}
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Развернуть" : "Свернуть"}
        title={isCollapsed ? "Развернуть" : "Свернуть"}
      >
        Содержание
        <ArrowButton data-is-collapsed={isCollapsed} />
      </button>

      <div style={{ height: padHeight }}></div>
      <ul
        ref={contentRef}
        className="table-of-contents"
        data-is-collapsed={isCollapsed}
      >
        {links.map((l, i) => (
          <ListItem key={i} to={l.link} level={1}>
            {l.title}
          </ListItem>
        ))}
      </ul>
    </Nav>
  )
}

function generateLinks(allMdx, location) {
  if (allMdx.edges === undefined || allMdx.edges.length === 0) return []

  const currentPage = allMdx.edges.find(item => {
    if (!item) return false
    return (
      item.node.fields.slug === location.pathname ||
      config.gatsby.pathPrefix + item.node.fields.slug === location.pathname
    )
  })

  if (!currentPage || !currentPage.node.tableOfContents.items) return []

  const links = currentPage.node.tableOfContents.items.map(innerItem => {
    const itemId = innerItem.title
      ? innerItem.title.replace(/\s+/g, "").toLowerCase()
      : "#"

    return {
      link: `#${itemId}`,
      title: innerItem.title,
    }
  })

  return links
}
