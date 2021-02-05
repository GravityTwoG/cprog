import React from "react"
import { styled } from "@linaria/react"

const StyledLi = styled.li`
  list-style: none;
  padding: 0.5rem 0;

  hr {
    margin: 0;
    padding: 0;
    border: 0;
    border-bottom: 1px solid #ede7f3;
  }
`

export const Divider = props => (
  <StyledLi {...props}>
    <hr />
  </StyledLi>
)
