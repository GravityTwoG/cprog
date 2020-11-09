import React from "react"
import { Link as GatsbyLink } from "gatsby"
import isAbsoluteUrl from "is-absolute-url"
import styled from "@emotion/styled"

const styles = ({ theme, level }) => ({
  color: theme.colors.link,
  textDecoration: "none",
  fontWeight: level === 0 ? 700 : 400,
  lineHeight: 1,
  display: "inline-block",
  position: "relative",
  transition: "color 0.2s linear",
  "&:hover": {
    color: "#ff6975",
  },
})

const StyledLink = styled.a(styles)
const StyledGatsbyLink = styled(GatsbyLink)(styles)

export const Link = ({ to, ...props }) =>
  isAbsoluteUrl(to) ? (
    <StyledLink href={to} {...props}>
      {props.children}
    </StyledLink>
  ) : (
    <StyledGatsbyLink to={to} {...props} />
  )
