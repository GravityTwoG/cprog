import React from "react"
import styled from "@emotion/styled"

import { useThemeContext } from "./theme/ThemeProvider"
import { StyledText } from "./StyledText"
import { Link } from "./Link"
import GithubIcon from "../images/github.svg"

const GithubLink = styled.span`
  height: 32px;
  border-radius: 4px;
  padding: 6px 8px;
  display: inline-flex;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.03em;
  line-height: 1;
  vertical-align: middle;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.3s linear;

  &[data-is-dark="true"]:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  &[data-is-dark="false"]:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  & > img {
    height: 100%;
    margin-right: 0.4em;
  }
`

export const GithubProfile = ({url, nickname}) => {
  const [, isDarkThemeActive] = useThemeContext()

  return (
    <StyledText>
      <strong style={{ marginRight: ".8em" }}>Разработано</strong>
      <Link
        target="_blank"
        rel="canonical"
        to={url}
        style={{ color: "inherit" }}
      >
        <GithubLink data-is-dark={isDarkThemeActive}>
          <img src={GithubIcon} alt="github-icon" />
          <span>{nickname}</span>
        </GithubLink>
      </Link>
    </StyledText>
  )
}