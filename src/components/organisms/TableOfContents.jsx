import React, { useState } from "react"
import { styled } from "@linaria/react"
import { useMeasure } from "react-use"

import { ArrowButton } from "../atoms/ArrowButton"
import { generateHeadingId } from "../mdxComponents"
import { useMemo } from "react"

const titleHeight = 36
const padHeight = 8

export const Nav = styled.nav`
  width: 100%;
  margin-bottom: 1rem;
  background: var(--backgroundColor);
  overflow: hidden;
  transition: height 0.2s ease-in-out;

  & .rightSideTitle {
    width: 100%;
    height: ${titleHeight}px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 16px;
    border-radius: 5px;
    border: none;

    font-family: inherit;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    line-height: 1;

    color: var(--textColor);
    cursor: pointer;
    background-color: transparent;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: var(--hoverColor);
    }

    & > button {
      height: auto;
      margin-right: 0;
    }
  }

  & > ul {
    padding-inline-start: 0;
    transition: opacity 0.2s ease-in-out;
    opacity: 1;
    &[data-is-collapsed="true"] {
      opacity: 0;
    }
  }
`

const StyledListItem = styled.li`
  list-style: none;
  list-style-type: none;
  margin-bottom: 4px;

  border-radius: 5px;
  background-color: transparent;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--hoverColor);
  }

  & > a {
    display: block;
    padding: 6px 16px;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;

    color: var(--textColor);
    text-decoration: none;
    position: relative;

    &:hover {
      color: var(--accentColor) !important;
    }
  }

  @media (max-width: 767px) {
    & > a {
      font-size: 14px;
    }
  }
`

export const ListItem = ({ className, children, ...props }) => {
  return (
    <StyledListItem className={className}>
      <a href={props.to} {...props} children={children} />
    </StyledListItem>
  )
}

export const TableOfContents = ({
  isDefaultCollapsed = false,
  className,
  content,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(isDefaultCollapsed)
  const [contentRef, { height: contentHeight }] = useMeasure()

  const links = useMemo(() => {
    if (!content || !content.items || !content.items.length) return null

    return content.items.map((l, i) => (
      <ListItem key={i} to={`#${generateHeadingId(l.title)}`} level={1}>
        {l.title}
      </ListItem>
    ))
  }, [content.items])

  if (!links) return null

  return (
    <Nav
      className={className}
      style={{
        height: titleHeight + (isCollapsed ? 0 : contentHeight + padHeight),
      }}
    >
      <button
        className={"rightSideTitle"}
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Развернуть" : "Свернуть"}
        title={isCollapsed ? "Развернуть" : "Свернуть"}
      >
        Содержание
        <ArrowButton data-is-collapsed={isCollapsed} />
      </button>

      <div style={{ height: padHeight }}></div>
      <ul
        ref={contentRef}
        className="table-of-contents"
        data-is-collapsed={isCollapsed}
      >
        {links}
      </ul>
    </Nav>
  )
}
