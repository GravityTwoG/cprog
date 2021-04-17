import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { styled } from "@linaria/react"

import config from "../../config"

import { ArrowButton } from "./ArrowButton"

export const Sidebar = styled.aside`
  width: 100%;
  padding-bottom: 1rem;
  background: var(--backgroundColor);

  & .rightSideBarUL .rightSideTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;

    line-height: 1;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    padding: 0px 16px;
    color: var(--textColor);
    cursor: pointer;
    border-radius: 5px;
    background-color: transparent;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }

    & > button {
      height: auto;
      margin-right: 0;
      padding-top: 10px;
      padding-bottom: 6px;
    }
  }

  .rightSideBarUL {
    padding-inline-start: 0;

    & li {
      list-style-type: none;
      padding: 10px 16px;
    }
    & li a {
      padding: 0;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.5;

      color: var(--textColor);
    }
  }
`

const StyledListItem = styled.li`
  list-style: none;

  & > a {
    display: block;
    padding: 0.45rem 0 0.45rem ${props => 2 + (props.level || 0) * 1}rem;
    color: #5c6975;
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
    position: relative;

    &:hover {
      color: var(--accentColor) !important;
    }
  }
`

export const ListItem = ({ className, level, ...props }) => {
  return (
    <StyledListItem className={className} level={level}>
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

  const [isCollapsed, setIsCollapsed] = useState(true)

  if (finalNavItems && finalNavItems.length) {
    return (
      <Sidebar className={className}>
        <ul className={"rightSideBarUL"}>
          {!isDefaultCollapsed && (
            <>
              <li className={"rightSideTitle"}>Содержание</li>
              {finalNavItems}
            </>
          )}
          {isDefaultCollapsed && (
            <>
              <li
                className={"rightSideTitle"}
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                Содержание
                <ArrowButton
                  aria-label={isCollapsed ? "Развернуть" : "Свернуть"}
                  title={isCollapsed ? "Развернуть" : "Свернуть"}
                  data-is-collapsed={isCollapsed}
                />
              </li>
              {!isCollapsed && finalNavItems}
            </>
          )}
        </ul>
      </Sidebar>
    )
  }

  return (
    <Sidebar className={className}>
      <ul></ul>
    </Sidebar>
  )
}
