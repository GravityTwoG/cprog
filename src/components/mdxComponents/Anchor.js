import React from "react"

export const AnchorTag = ({ children: link, ...props }) => {
  if (link) {
    return (
      <a href={props.href} target="_blank" rel="noopener noreferrer">
        {link}
      </a>
    )
  }
  return null
}
