import React from "react"
import styled from "@emotion/styled"
import config from "../../../config"

import { useStaticQuery, graphql } from "gatsby"
import { ExternalLink } from "react-feather"
import { Tree } from "./Tree"

const StyledListItem = styled("li")`
  list-style: none;

  a {
    color: #5c6975;
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
    padding: 0.45rem 0 0.45rem ${props => 2 + (props.level || 0) * 1}rem;
    display: block;
    position: relative;

    &:hover {
      color: ${({ theme }) => theme?.colors?.accent} !important;
    }

    ${props =>
      props.active &&
      `
      // color: #663399;
      border-color: rgb(230,236,241) !important;
      border-style: solid none solid solid;
      border-width: 1px 0px 1px 1px;
      background-color: #fff;
    `} // external link icon
    svg {
      float: right;
      margin-right: 1rem;
    }
  }
`

const ListItem = ({ className, active, level, ...props }) => {
  return (
    <StyledListItem className={className}>
      <a href={props.to} {...props} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    </StyledListItem>
  )
}

const StyledSidebar = styled("aside")`
  width: 100%;
  height: 100vh;
  overflow: auto;
  position: fixed;
  padding-left: 0px;
  position: -webkit-sticky;
  position: -moz-sticky;
  position: sticky;
  top: 0;
  padding-right: 0;
  box-shadow: -1px 0px 4px 1px rgba(175, 158, 232, 0.4);

  @media only screen and (max-width: 1023px) {
    width: 100%;
    /* position: relative; */
    height: 100vh;
  }

  @media (min-width: 767px) and (max-width: 1023px) {
    padding-left: 0;
  }

  @media only screen and (max-width: 767px) {
    padding-left: 0px;
    height: auto;
  }
`

const Divider = styled(props => (
  <li {...props}>
    <hr />
  </li>
))`
  list-style: none;
  padding: 0.5rem 0;

  hr {
    margin: 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid #ede7f3;
  }
`

export const Sidebar = () => {
  const { allMdx } = useStaticQuery(graphql`
    query SidebarQuery {
      allMdx {
        edges {
          node {
            id
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
        <Tree edges={allMdx.edges} />

        {config.sidebar.links && config.sidebar.links.length > 0 && <Divider />}

        {config.sidebar.links.map((link, key) => {
          if (link.link !== "" && link.text !== "") {
            return (
              <ListItem key={key} to={link.link}>
                {link.text}
                <ExternalLink size={14} />
              </ListItem>
            )
          }
          return null
        })}
      </ul>
    </StyledSidebar>
  )
}
