import React from "react"
import { styled } from '@linaria/react';

const StyledButton = styled.button`
  display: none;
  border: 0 solid #fff;
  border-radius: 4px;
  width: 36px;
  height: 36px;
  position: relative;
  outline: none;
  cursor: pointer;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0);
  transition: background-color 0.2s ease;

  &:hover,
  &:focus,
  &:focus-within,
  &:focus-visible {
    background-color: rgba(25, 25, 25, 0.2);
    html[data-theme="dark"] & {
      background-color: rgba(119, 119, 119, 0.4);
    }
  }

  & > div {
    width: 70%;
    height: 4px;
    border-radius: 2px;
    background: var(--accentColor);
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transition: transform 0.2s ease, rotate 0.2s ease;
    transform: translate(-50%, -50%) rotate(0deg);

    &:nth-of-type(1) {
      transform: translate(-50%, calc(-50% - 8px)) rotate(0deg);
    }
    &:nth-of-type(2) {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    &:nth-of-type(3) {
      transform: translate(-50%, calc(-50% + 8px)) rotate(0deg);
    }
  }

  &[data-is-open="true"] > div {
    &:nth-of-type(1) {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    &:nth-of-type(2) {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &:nth-of-type(3) {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
  @media (max-width: 1024px) {
    display: inline-block;
  }
`

export const BurgerButton = React.forwardRef((props, ref) => (
  <StyledButton ref={ref} {...props}>
    <div />
    <div />
    <div />
  </StyledButton>
))
