import styled from "@emotion/styled"
import React from "react"

export const ChapterHeading = styled(p => (
  <span {...p} className={"chapter-heading " + p.className} />
))`
  transition: color 0.2s linear;
  cursor: pointer;
`

export const StyledListItem = styled("li")`
  list-style: none;
  border-left: 1px solid var(--decoColor);
  & .tree-node-title {
    display: flex;
    align-items: center;
  }
  .tree-node-title:hover > a,
  .tree-node-title:hover > .chapter-heading {
    color: var(--accentColor);
  }

  &.active a:hover,
  &.active .chapter-heading:hover {
    color: var(--textColor);
  }

  &.active > .tree-node-title {
    background-color: #3884ff;

    & > a,
    & > .chapter-heading {
      color: #fff;
    }
  }

  a,
  .chapter-heading {
    flex-grow: 1;
    color: var(--textColor);
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? 700 : 500)};
    font-size: 14px;
    padding: 0.45rem 1rem 0.45rem ${props => 2 + (props.level || 0) * 1}rem;
    display: block;
    position: relative;
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

export const StyledSidebar = styled.aside`
  width: 100%;
  height: calc(100vh - 70px);
  padding-left: 0;
  position: sticky;
  top: 0;
  padding-right: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;

  .firstLevel > ul > .item {
    margin-left: 0 !important;
    border: none;
  }
  .sideBarUL > li {
    border: none;
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
    border-width: 1px 0 1px 1px;
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

  .sidebarTitle {
    background-color: #f8f8f8;
    padding: 18px 16px;
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    font-weight: 600;
    color: #001934;
    display: flex;
    align-items: center;

    & a {
      color: #001934;
    }
  }

  @media only screen and (max-width: 1023px) {
    width: 100%;
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
