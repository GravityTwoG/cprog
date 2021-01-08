import React from "react"
import styled from "@emotion/styled"

import { useThemeContext } from "./theme/ThemeProvider"

const StyledSwitch = styled.label`
  display: inline-block;
  position: relative;
  width: 58px;
  height: 30px;
  margin: 0 auto;
  border-radius: 16px;
  border: 2px solid var(--accentColor);
  overflow: hidden;
  
  & > input {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin: 0px;
    cursor: pointer;
    opacity: 0;
    z-index: 2;
  }
  
  & > span {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    overflow: hidden;
    opacity: 1;
    background-color: #fff;
    box-shadow: 0px 2px 5px #d9d9d9;
    border-radius: 4px;
    transition: 0.2s ease background-color, 0.2s ease opacity;
  }
  
  & > span:before, & > span:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    transition: 0.5s ease transform, 0.2s ease background-color;
  }

  & span:before {
    background-color: #fff;
    transform: translate(-100%,-100%);
    z-index: 1;
    transition: transform 0.8s ease, background-color 0.2s ease;
  }
  & span:after {
    background-color: #f0bb31;
    transform: translate(1px, -50%);
    z-index: 0;
  }

  & input:checked + span {
    background-color: #000;
  }
  & input:active + span {
    opacity: 0.5;
  }

  & input:checked + span:before {
    background-color: #000;
    transform: translate(20px, -70%);
  }

  & input:checked + span:after {
    background-color: #bdbdbd;
    transform: translate(29px, -50%);
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
        <input type="checkbox" onChange={toggleActiveTheme} checked={isDark}/>
        <span/>
      </StyledSwitch>
  )
};