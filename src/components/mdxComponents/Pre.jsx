import React from "react"
import { styled } from "@linaria/react"

const StyledPre = styled.pre`
  padding: 16px;
  background: var(--preFormattedTextColor);
  border-radius: 5px;
  overflow: auto;
  max-width: 100%;

  &.wrap {
    white-space: normal;
  }

  & p.paragraph {
    margin: 0;
  }
`

export const Pre = ({ wrap = false, ...props }) => {
  return (
    <StyledPre
      {...props}
      className={`${props.className || "" + wrap ? " wrap" : ""}`}
    />
  )
}
