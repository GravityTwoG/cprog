import React from "react"
import { styled } from "@linaria/react"

import { ExternalLinkIcon } from "../../atoms/ExternalLinkIcon"

export const StyledListItem = styled.li`
  list-style: none;
  margin-bottom: 0.5em;

  & > a {
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    padding: 0.45rem 1rem 0.45rem 2rem;
    position: relative;
  }
`

export const ExternalLink = ({ link, label, className, ...props }) => {
  return (
    <StyledListItem className={className}>
      <a href={link} {...props} target="_blank" rel="noopener noreferrer">
        {label}
        <ExternalLinkIcon />
      </a>
    </StyledListItem>
  )
}
