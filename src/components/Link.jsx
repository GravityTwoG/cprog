import React from "react"
import { Link as GatsbyLink } from "gatsby"
import isAbsoluteUrl from "is-absolute-url"
import styled from "@emotion/styled"

const StyledLink = styled("a")`
  color: ${({ theme }) => theme.colors.link};
  text-decoration: none;
  font-weight: ${({ level }) => (level === 0 ? 700 : 400)};
  display: inline-block;
  position: relative;

  &:hover {
    color: #ff6975;
  }
`

export const Link = ({ to, ...props }) =>
  isAbsoluteUrl(to) ? (
    <StyledLink href={to} {...props}>
      {props.children}
    </StyledLink>
  ) : (
    <GatsbyLink to={to} {...props} />
  )
