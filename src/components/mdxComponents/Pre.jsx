import React from "react"
import styled from "@emotion/styled"

const StyledPre = styled("pre")`
  padding: 16px;
  background: ${props => props.theme.colors.preFormattedText};
  border-radius: 5px;
  overflow: auto;
  
  &[data-is-codeblock="true"] {
    padding: 0;

    @media (max-width: 520px) {
      margin: 0 -25px;
      width: calc(100% + 50px);
      overflow: initial;
    }
  }

  @media (max-width: 768px) {
    padding: 8px;
  }
  
`

export const Pre = (props) => {
  let isCodeBlock = false
  if (props.children?.props?.mdxType === 'code') {
    isCodeBlock = true
  }

  return <StyledPre {...props} data-is-codeblock={isCodeBlock} />
}