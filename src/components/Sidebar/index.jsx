import React from "react"

import { ExternalLink } from "react-feather"
import { Tree } from "./Tree"
import { Divider, ListItem, StyledSidebar } from "./items.jsx"
import { PwaWidget } from "../PwaWidget"
import config from "../../../config"

export const Sidebar = ({ location, ...props }) => {
  return (
    <StyledSidebar {...props}>
      {config.sidebar.title && (
        <div
          className={"sidebarTitle hiddenMobile"}
          dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
        />
      )}

      <nav>
        <ul className="sideBarUL">
          <Tree location={location} />
          {config.sidebar.links && config.sidebar.links.length > 0 && (
            <Divider />
          )}

          {config.sidebar.links.map((link, key) => {
            if (link.link && link.text) {
              return (
                <ListItem key={key} to={link.link} rel="noopener">
                  {link.text}
                  <ExternalLink size={14} style={{ marginLeft: "5px" }} />
                </ListItem>
              )
            }
            return null
          })}
        </ul>
      </nav>

      <PwaWidget />
    </StyledSidebar>
  )
}
