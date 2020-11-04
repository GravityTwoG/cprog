import styled from "@emotion/styled"
import React from "react"

export const StyledListItem = styled("li")`
  list-style: none;

  &.active a:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
    padding: 0.45rem 0 0.45rem ${props => 2 + (props.level || 0) * 1}rem;
    display: block;
    position: relative;

    &:hover {
      color: ${({ theme }) => theme?.colors?.accent};
    }

    // external link icon
    svg {
      float: right;
      margin-right: 1rem;
    }
  }
`

export const ListItem = ({ className, active, level, ...props }) => {
  return (
    <StyledListItem className={className}>
      <a href={props.to} {...props} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    </StyledListItem>
  )
}

export const StyledSidebar = styled("aside")`
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
  box-shadow: rgba(116, 129, 141, 0.1) 0px 3px 8px 0px;

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

export const Divider = styled(props => (
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
