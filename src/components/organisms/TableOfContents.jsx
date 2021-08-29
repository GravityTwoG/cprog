import React, { useRef, useState } from "react"
import { styled } from "@linaria/react"
import { useMeasure, useClickAway } from "react-use"

import { ArrowButton } from "../atoms/ArrowButton"
import { generateHeadingId } from "../mdxComponents"
import { useMemo } from "react"

const titleHeight = 36

export const Nav = styled.nav`
  width: 100%;
  margin-bottom: 1rem;
  background: var(--backgroundColor);
  position: relative;

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
    transition: background-color 0.2s ease-in-out;

    &:hover {
      background-color: var(--hoverColor);
    }

    & > button {
      height: auto;
      margin-right: 0;
    }
  }

  & > div {
    position: absolute;
    top: 100%;
    width: 100%;

    background: var(--backgroundColor);
    border-radius: 5px;
    transition: height 0.15s ease-in-out;
    box-shadow: var(--boxShadow);
    overflow: hidden;
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      display: block;
      width: 100%;
      height: 4px;
      background-color: var(--accentColor);
    }
  }

  & > div > ul {
    padding-inline-start: 0;
  }
`

export const TableOfContents = ({
  isDefaultCollapsed = false,
  className,
  content,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(isDefaultCollapsed)
  const [contentRef, { height: contentHeight }] = useMeasure()
  const navRef = useRef()
  useClickAway(navRef, () => {
    setIsCollapsed(true)
  })

  const links = useMemo(() => {
    if (!content || !content.items || !content.items.length) return null

    return content.items.map((l, i) => (
      <ListItem
        key={i}
        to={`#${generateHeadingId(l.title)}`}
        level={1}
        onClick={() => setIsCollapsed(true)}
      >
        {l.title}
      </ListItem>
    ))
  }, [content])

  if (!links) return null

  return (
    <Nav className={className} data-is-collapsed={isCollapsed} ref={navRef}>
      <button
        className={"rightSideTitle"}
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label={isCollapsed ? "Развернуть" : "Свернуть"}
        title={isCollapsed ? "Развернуть" : "Свернуть"}
      >
        Содержание
        <ArrowButton data-is-collapsed={isCollapsed} />
      </button>

      <div style={{ height: isCollapsed ? 0 : contentHeight + 4 }}>
        <ul ref={contentRef} className="table-of-contents">
          {links}
        </ul>
      </div>
    </Nav>
  )
}

const StyledListItem = styled.li`
  list-style: none;
  list-style-type: none;

  &:not(:last-child) {
    margin-bottom: 4px;
  }

  border-radius: 5px;
  background-color: transparent;
  transition: background-color 0.2s ease-in-out;

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
