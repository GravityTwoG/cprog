import React from "react"
import { styled } from "@linaria/react"

import OpenedSvg from "../../images/opened"

const StyledButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  margin-left: auto;
  margin-right: 5px;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;

  & > svg {
    width: 20px;
    height: 20px;
    fill: var(--textColor);
    transform: rotate(0deg);
    transform-origin: center;
    transition: transform 0.15s linear, fill 0.2s linear;
  }
  &[data-is-active="true"] > svg {
    fill: #fff;
  }
  &[data-is-collapsed="true"] > svg {
    transform: rotate(-90deg);
  }
`

export const ArrowButton = props => (
  <StyledButton {...props}>
    <OpenedSvg />
  </StyledButton>
)
