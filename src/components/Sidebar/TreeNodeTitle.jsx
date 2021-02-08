import React from "react"
import { styled } from "@linaria/react"

import { Link } from "../Link"
import { ArrowButton } from "../ArrowButton"

import config from "../../../config"

const ChapterHeading = styled(p => (
  <span {...p} className={"chapter-heading " + p.className} />
))`
  transition: color 0.2s linear;
  cursor: pointer;
`

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 16px;

  & > .chapter-heading,
  & > span {
    flex: 1;
  }

  &:hover > span > a,
  &:hover > .chapter-heading {
    color: var(--accentColor);
    & + button > svg {
      // arrow
      fill: var(--accentColor);
    }
  }
`

export const TreeNodeTitle = ({
  title,
  isChapterHeading,
  isCollapsed,
  collapse,
  url,
  hasChildren,
  active,
}) => {
  return (
    <StyledDiv className="tree-node-title">
      {title && !isChapterHeading && <Link to={url}>{title}</Link>}
      {isChapterHeading && (
        <ChapterHeading onClick={collapse} role="button">
          {title}
        </ChapterHeading>
      )}
      {title && hasChildren && !config.sidebar.frontLine ? (
        <ArrowButton
          onClick={collapse}
          aria-label={isCollapsed ? "Развернуть" : "Свернуть"}
          title={isCollapsed ? "Развернуть" : "Свернуть"}
          data-is-active={active}
          data-is-collapsed={isCollapsed}
        />
      ) : null}
    </StyledDiv>
  )
}
