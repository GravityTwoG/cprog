import React from "react"
import { styled } from "@linaria/react"

import config from "../../../../config"

import { Link } from "../../atoms/Link"
import { ArrowButton } from "../../atoms/ArrowButton"

const ChapterHeading = p => (
  <span {...p} className={"chapter-heading " + p.className} />
)

const StyledDivNodeTitle = styled.div`
  min-height: 36px;
  display: flex;
  align-items: center;
  cursor: pointer;

  font-size: 16px;
  line-height: 16px;

  background-color: transparent;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  & > .chapter-heading {
    color: var(--textColor);
    flex-grow: 1;
    display: block;
  }

  & > .chapter-heading,
  & > span {
    flex: 1;
  }
  & > .tree-node-arrow {
    pointer-events: none;
  }
  &:hover {
    background-color: var(--hoverColor);
    & > span > a {
      color: var(--accentColor);
    }
    & > .chapter-heading + button > svg {
      // arrow
      fill: var(--accentColor);
    }
  }
`

export const TreeNodeTitle = React.forwardRef(
  (
    {
      title,
      isChapterHeading,
      isCollapsed,
      collapse,
      url,
      hasChildren,
      active,
    },
    ref
  ) => {
    return (
      <StyledDivNodeTitle
        className="tree-node-title"
        ref={ref}
        onClick={isChapterHeading ? collapse : undefined}
        role={isChapterHeading ? "button" : ""}
      >
        {title && !isChapterHeading && <Link to={url}>{title}</Link>}
        {isChapterHeading && <ChapterHeading>{title}</ChapterHeading>}
        {title && hasChildren && !config.sidebar.frontLine ? (
          <ArrowButton
            aria-label={isCollapsed ? "Развернуть" : "Свернуть"}
            title={isCollapsed ? "Развернуть" : "Свернуть"}
            data-is-active={active}
            data-is-collapsed={isCollapsed}
            className="tree-node-arrow"
          />
        ) : null}
      </StyledDivNodeTitle>
    )
  }
)
