import React from "react"
import { styled } from '@linaria/react';

import { ChapterHeading } from "./items"
import OpenedSvg from "../../images/opened"
import { Link } from "../Link"

import config from "../../../config"

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  
  & > .chapter-heading,
  & > span {
    flex: 1;
  }

  &:hover > span > a,
  &:hover > .chapter-heading {
    color: var(--accentColor);
    & + button > svg {
      fill: var(--accentColor);
    }
  }
`

const ArrowButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  margin-left: auto;
  margin-right: 5px;
  padding: 0.5rem;
  cursor: pointer;

  & > svg {
    width: 20px;
    height: 20px;
    fill: var(--textColor);
    transform: rotate(0deg);
    transform-origin: center;
    transition: transform 0.15s linear, fill 0.2s linear;
  }
  &[data-is-active="true"] > svg {
    fill: #fff;
  }
  &[data-is-collapsed="true"] > svg {
    transform: rotate(-90deg);
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
        >
          <OpenedSvg />
        </ArrowButton>
      ) : null}
    </StyledDiv>
  )
}
