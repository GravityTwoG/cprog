import React from "react"
import { styled } from "@linaria/react"

const StyledPre = styled.pre`
  padding: 16px;
  background: var(--preFormattedTextColor);
  border-radius: 5px;
  overflow: auto;
  max-width: 100%;
`

export const Pre = props => {
  return <StyledPre {...props} className="kek" />
}
