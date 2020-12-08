import React from "react"
import styled from "@emotion/styled"

const StyledPre = styled("pre")`
  padding: 16px 16px;
  background: ${props => props.theme.colors.preFormattedText};
  border-radius: 5px;
  overflow: auto;
  
  &[data-hide-paddings="true"] {
    padding: 0;
  }

  @media (max-width: 768px) {
    padding: 8px 8px;
  }
`

export const Pre = (props) => {
  let hidePaddings = false
  if (props.children?.props?.mdxType === 'code') {
    hidePaddings = true
  }

  return <StyledPre {...props} data-hide-paddings={hidePaddings} />
}