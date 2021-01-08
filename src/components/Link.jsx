import React from "react"
import { Link as GatsbyLink } from "gatsby"
import isAbsoluteUrl from "is-absolute-url"
import styled from "@emotion/styled"

const StyledLink = styled.a`
  color: var(--linkColor);
  text-decoration: none;
  font-weight: ${({level}) => level === 0 ? '700' : '400'};
  line-height: 1;
  display: inline-block;
  position: relative;
  transition: color 0.2s linear;
  &:hover {
    color: #ff6975;
  }
`
const StyledGatsbyLink = styled(GatsbyLink)`
  color: var(--linkColor);
  text-decoration: none;
  font-weight: ${({level}) => level === 0 ? '700' : '400'};
  line-height: 1;
  display: inline-block;
  position: relative;
  transition: color 0.2s linear;
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
    <StyledGatsbyLink to={to} {...props} />
  )
