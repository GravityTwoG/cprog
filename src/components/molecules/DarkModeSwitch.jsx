import React from "react"
import { styled } from "@linaria/react"

import { useThemeContext } from "../ThemeProvider"

const StyledSwitch = styled.label`
  display: inline-block;
  position: relative;
  width: 58px;
  height: 30px;
  border-radius: 16px;
  overflow: hidden;

  & > input {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    cursor: pointer;
    opacity: 0;
    z-index: 2;
  }

  & > span {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
    opacity: 1;
    background-color: #fff;
    border-radius: inherit;
    transition: background-color 0.2s ease, opacity 0.2s ease;
    & > .switch-border {
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 1;
      transform: translate(-50%, -50%);
      border-radius: inherit;
      border: 2px solid #cccccc;
      transition: border-color 0.2s ease;
    }
  }

  & .switch-circle,
  & .switch-circle:after {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    transition: 0.5s ease transform, 0.2s ease background-color;
    will-change: transform, background-color;
  }

  & .switch-circle:after {
    background-color: #fff;
    transform: translate(-100%, -100%);
    z-index: 1;
    transition: transform 0.8s ease, background-color 0.2s ease;
  }
  & .switch-circle {
    background-color: #f0bb31;
    transform: translate(4px, -50%);
    z-index: 0;
  }

  & input:checked + span {
    background-color: #000;
  }

  & input:active,
  & input:hover,
  & input:focus,
  & input:focus-within,
  & input:focus-visible {
    & + span > .switch-border {
      border-color: var(--accentColor);
    }
  }

  & input:checked + span .switch-circle:after {
    background-color: #000;
    transform: translate(-10px, -70%);
  }

  & input:checked + span .switch-circle {
    background-color: #777;
    transform: translate(32px, -50%);
  }
`

export const DarkModeSwitch = ({ ...props }) => {
  const [toggleActiveTheme, isDark] = useThemeContext()

  return (
    <StyledSwitch
      {...props}
      title={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
    >
      <input type="checkbox" onChange={toggleActiveTheme} checked={isDark} />
      <span>
        <span className="switch-border" />
        <span className="switch-circle" />
      </span>
    </StyledSwitch>
  )
}
