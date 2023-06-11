import React from "react"
import { styled } from "@linaria/react"

const StyledBlockQuote = styled.blockquote`
  margin: 0 0 40px;
  padding: 4px 12px 6px;
  background-color: #d7edff;
  color: #444;
  border-radius: 5px;
  border-left: 5px solid var(--accentColor, #e6ecf1);

  html[data-theme="dark"] & {
    background-color: #2d4c66;
    color: #fff;
  }

  & p.paragraph {
    padding: 0;
    margin: 0;
  }
`

export const BlockQuote = props => {
  return <StyledBlockQuote {...props} />
}
