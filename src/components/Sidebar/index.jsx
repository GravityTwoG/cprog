import React from "react"
import config from "../../../config"

import { ExternalLink } from "react-feather"
import { Tree } from "./Tree"
import { Divider, ListItem, StyledSidebar } from "./items.jsx"

export const Sidebar = ({ location, ...props }) => {
  return (
    <StyledSidebar {...props}>
      {config.sidebar.title ? (
        <div
          className={"sidebarTitle hiddenMobile"}
          dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
        />
      ) : null}
      <ul className={"sideBarUL"}>
        <Tree location={location} />

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
