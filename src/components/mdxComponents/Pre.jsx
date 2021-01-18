import React from "react"
import styled from "@emotion/styled"
import { CodeBlock } from "./CodeBlock";

const StyledPre = styled("pre")`
  padding: 16px;
  background: var(--preFormattedTextColor);
  border-radius: 5px;
  overflow: auto;
  
  @media (max-width: 768px) {
    padding: 8px;
  }
  
`

export const Pre = (props) => {
  if (props.children?.props?.mdxType === 'code') {
    return <CodeBlock {...props}/>
  }
  return <StyledPre {...props}/>
}