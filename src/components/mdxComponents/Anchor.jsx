import React from "react"
import isAbsoluteUrl from "is-absolute-url"
import { Link as GatsbyLink } from "gatsby"

export const AnchorTag = ({ children, href, ...props }) => {
  if (!children) return null
  if (!isAbsoluteUrl(href)) {
    return <GatsbyLink to={href} children={children} {...props} />
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
