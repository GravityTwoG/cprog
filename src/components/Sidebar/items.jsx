import { styled } from "@linaria/react"
import React from "react"

export const StyledListItem = styled.li`
  list-style: none;
  border-left: 1px solid var(--decoColor);
  margin-bottom: 0.5em;

  &.active:hover a,
  &.active:hover .chapter-heading:hover {
    color: var(--accentColor);
  }
  & > .tree-node-title {
    position: relative;
  }
  & > .tree-node-title:after {
    content: "";
    display: block;
    position: absolute;
    bottom: 0;
    margin-left: 2rem;
    width: calc(100% - 4rem);
    height: 4px;
    border-radius: 2px;
    background-color: transparent;
  }
  &.active > .tree-node-title:after {
    background-color: var(--accentColor);
  }
  &.active > .tree-node-title > span > a {
    color: var(--accentColor);
  }

  & > .tree-node-title > span > a,
  & .chapter-heading {
    color: var(--textColor);
    flex-grow: 1;
    display: block;
  }

  & > .tree-node-title > span > a,
  & > a,
  & .chapter-heading {
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? 700 : 500)};
    font-size: 14px;
    padding: 0.45rem 1rem 0.45rem ${props => 2 + (props.level || 0)}rem;
    position: relative;
  }

  ul {
    padding-inline-start: 0;
  }
`

export const ListItem = ({ className, active, level, ...props }) => {
  return (
    <StyledListItem className={className} level={level} active={active}>
      <a href={props.to} {...props} target="_blank" rel="noopener noreferrer">
        {props.children}
      </a>
    </StyledListItem>
  )
}
