import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import config from "../../config"

import { styled } from "@linaria/react"

export const Sidebar = styled.aside`
  width: 100%;
  border-right: 1px solid #ede7f3;
  height: 100vh;
  overflow: auto;
  position: fixed;
  padding-left: 1.5rem;
  position: sticky;
  top: 70px;

  background: var(--backgroundColor);

  .rightSideTitle {
    line-height: 1;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    padding: 7px 24px 7px 16px;
    border-left: 1px solid #e6ecf1;
    border-left-color: rgb(230, 236, 241);

    color: var(--textColor);
  }

  .rightSideBarUL {
    margin-top: 32px;
  }

  .rightSideBarUL li {
    list-style-type: none;
    border-left: 1px solid #e6ecf1;
    border-left-color: var(--decoColor);
  }

  .rightSideBarUL li a {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    padding: 7px 24px 7px 16px;

    color: var(--textColor);
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

export const RightSidebar = ({ location }) => {
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

  if (finalNavItems && finalNavItems.length) {
    return (
      <Sidebar>
        <ul className={"rightSideBarUL"}>
          <li className={"rightSideTitle"}>Содержание</li>
          {finalNavItems}
        </ul>
      </Sidebar>
    )
  }

  return (
    <Sidebar>
      <ul></ul>
    </Sidebar>
  )
}
