import React from "react"
import config from "../../../config"

import { useStaticQuery, graphql } from "gatsby"
import { ExternalLink } from "react-feather"
import { Tree } from "./Tree"
import { Divider, ListItem, StyledSidebar } from "./items.jsx"

export const Sidebar = ({ location }) => {
  const { allMdx } = useStaticQuery(graphql`
    query SidebarQuery {
      allMdx {
        edges {
          node {
            id
            frontmatter {
              type
            }
            fields {
              slug
              title
            }
          }
        }
      }
    }
  `)

  return (
    <StyledSidebar>
      {config.sidebar.title ? (
        <div
          className={"sidebarTitle hiddenMobile"}
          dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
        />
      ) : null}
      <ul className={"sideBarUL"}>
        <Tree edges={allMdx.edges} location={location} />

        {config.sidebar.links && config.sidebar.links.length > 0 && <Divider />}

        {config.sidebar.links.map((link, key) => {
          if (link.link !== "" && link.text !== "") {
            return (
              <ListItem key={key} to={link.link}>
                {link.text}
                <ExternalLink size={14} style={{ marginLeft: "5px" }} />
              </ListItem>
            )
          }
          return null
        })}
      </ul>
    </StyledSidebar>
  )
}
