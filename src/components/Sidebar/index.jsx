import React from "react"
import config from "../../../config"

import { ExternalLink } from "react-feather"
import { Tree } from "./Tree"
import { Divider, ListItem, StyledSidebar } from "./items.jsx"
import {graphql, useStaticQuery} from "gatsby";
import {StyledText} from "../StyledText";

export const Sidebar = ({ location, ...props }) => {
  const data = useStaticQuery(graphql`
    query SidebarQuery {
      site {
        buildTime
      }
    }
  `)
  const buildDate = formatDate(data.site.buildTime)
  return (
    <StyledSidebar {...props}>
      {config.sidebar.title ? (
        <div
          className={"sidebarTitle hiddenMobile"}
          dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
        />
      ) : null}
      <nav>
        <ul className={"sideBarUL"}>
          <Tree location={location} />
          {config.sidebar.links && config.sidebar.links.length > 0 && <Divider />}

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
      <div style={{padding: "16px 16px 16px 32px"}}>
        <StyledText>Последнее обновление:</StyledText>
        <StyledText>{buildDate}</StyledText>
      </div>
    </StyledSidebar>
  )
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const utcDate = new Date(date.toLocaleString("en-EU", {timeZone: 'UTC'}))
  const day = utcDate.getDate();
  const month = utcDate.getMonth() + 1;
  const year = utcDate.getFullYear();
  let hours = utcDate.getHours()
  let minutes = utcDate.getMinutes();
  let seconds = utcDate.getSeconds()
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;
  return `${day}:${month < 10 ? "0"+month : month}:${year} ${hours}:${minutes}:${seconds}`
}