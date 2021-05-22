import React from "react"
import { Link as GatsbyLink } from "gatsby"
import isAbsoluteUrl from "is-absolute-url"
import { styled } from "@linaria/react"

const StyledLink = styled.a`
  color: var(--linkColor);
  text-decoration: none;
  font-weight: ${({ level }) => (level === 0 ? "700" : "400")};
  line-height: 1;
  display: inline-block;
  position: relative;
  transition: color 0.2s linear;
  &:hover {
    color: #ff6975;
  }
`
const StyledSpan = styled.span`
  & > a {
    color: var(--linkColor);
    text-decoration: none;
    font-weight: ${({ level }) => (level === 0 ? "700" : "400")};
    line-height: 1;
    display: inline-block;
    position: relative;
    transition: color 0.2s linear;
    &:hover {
      color: #ff6975;
    }
  }
`

export const Link = ({ to, style, ...props }) => {
  if (isAbsoluteUrl(to)) {
    return (
      <StyledLink href={to} {...props} style={style}>
        {props.children}
      </StyledLink>
    )
  }
  return (
    <StyledSpan style={style}>
      <GatsbyLink to={to} {...props} />
    </StyledSpan>
  )
}
