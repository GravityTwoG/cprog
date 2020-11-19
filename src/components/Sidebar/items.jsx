import styled from "@emotion/styled"
import React from "react"

export const StyledListItem = styled("li")`
  list-style: none;
  border-left: 1px solid ${({ theme }) => theme.colors.deco};
  & .tree-node-title {
    display: flex;
    align-items: center;
  }

  &.active a:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &.active > .tree-node-title {
    background-color: #3884ff;

    & > a {
      color: #fff;
    }
  }

  a {
    flex-grow: 1;
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
    padding: 0.45rem 1rem 0.45rem ${props => 2 + (props.level || 0) * 1}rem;
    display: block;
    position: relative;

    &:hover {
      color: ${({ theme }) => theme?.colors?.accent};
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
  box-shadow: ${({ theme }) => theme.boxShadow};

  .firstLevel > ul > .item {
    margin-left: 0 !important;
  }

  .sideBarUL li {
    list-style-type: none;
    width: auto;
  }
  .sideBarUL li a {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.5;
    border-style: solid none solid solid;
    border-width: 1px 0px 1px 1px;
    border-color: transparent currentcolor transparent transparent;
  }
  .sideBarUL .item {
    list-style: none;
    padding: 0;
  }
  .sideBarUL .item > a {
    text-decoration: none;
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
  }
  .sideBarUL .item .item {
    margin-left: 16px;
  }

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
