import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { styled } from "@linaria/react"
import { useMeasure } from "react-use"

import config from "../../config"

import { ArrowButton } from "./ArrowButton"

export const Nav = styled.nav`
  width: 100%;
  margin-bottom: 1rem;
  background: var(--backgroundColor);
  overflow: hidden;
  transition: height 0.2s ease-in-out;

  & .rightSideTitle {
    width: 100%;
    height: 36px;
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

  & ul {
    padding-inline-start: 0;
    transition: opacity 0.2s ease-in-out;
    opacity: 1;
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

export const ListItem = ({ className, ...props }) => {
  return (
    <StyledListItem className={className}>
      <a href={props.to} {...props} />
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

  let finalNavItems

  if (allMdx.edges !== undefined && allMdx.edges.length > 0) {
    allMdx.edges.forEach(item => {
      let innerItems

      if (item !== undefined) {
        if (
          item.node.fields.slug === location.pathname ||
          config.gatsby.pathPrefix + item.node.fields.slug === location.pathname
        ) {
          if (item.node.tableOfContents.items) {
            innerItems = item.node.tableOfContents.items.map(
              (innerItem, index) => {
                const itemId = innerItem.title
                  ? innerItem.title.replace(/\s+/g, "").toLowerCase()
                  : "#"

                return (
                  <ListItem key={index} to={`#${itemId}`} level={1}>
                    {innerItem.title}
                  </ListItem>
                )
              }
            )
          }
        }
      }
      if (innerItems) {
        finalNavItems = innerItems
      }
    })
  }

  const [isCollapsed, setIsCollapsed] = useState(isDefaultCollapsed)

  const [contentRef, { height: contentHeight }] = useMeasure()
  if (finalNavItems && finalNavItems.length) {
    return (
      <Nav
        className={className}
        style={{ height: 36 + (isCollapsed ? 0 : contentHeight) }}
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

        <ul
          ref={contentRef}
          className="table-of-contents"
          style={{ opacity: isCollapsed ? 0 : 1 }}
        >
          {finalNavItems}
        </ul>
      </Nav>
    )
  }

  return (
    <Nav className={className}>
      <ul></ul>
    </Nav>
  )
}
