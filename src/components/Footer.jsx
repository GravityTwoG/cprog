import React from "react"
import styled from "@emotion/styled"
import config from "../../config"
import { useThemeContext } from "./theme/ThemeProvider"

import { ExternalLink } from "react-feather"
import { Link } from "./Link"
import { StyledText } from "./StyledText"
import GithubIcon from "../images/github.svg"
import { PaddingWrapper } from "../templates/Book"

const StyledFooter = styled.footer`
  padding: 1rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.deco};
`

export const Footer = () => (
  <PaddingWrapper>
    <StyledFooter>
      <p className="paragraph">
        <StyledText>
          <strong>Все материалы взяты с сайта </strong>
          <Link to="http://ermak.cs.nstu.ru/cprog/html/">
            ermak.cs.nstu.ru/cprog/html
            <ExternalLink size={14} style={{ marginLeft: "0.3rem" }} />
          </Link>
        </StyledText>
      </p>
      {config.author?.githubUrl && config.author?.githubUrl ? (
        <GithubProfile />
      ) : null}
    </StyledFooter>
  </PaddingWrapper>
)

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

const GithubProfile = () => {
  const [, isDarkThemeActive] = useThemeContext()

  return (
    <StyledText>
      <strong style={{ marginRight: ".8em" }}>Разработано</strong>
      <Link
        target="_blank"
        rel="canonical"
        to={config.author.githubUrl}
        style={{ color: "inherit" }}
      >
        <GithubLink data-is-dark={isDarkThemeActive}>
          <img src={GithubIcon} alt="github-icon" />
          <span>{config.author.githubNickname}</span>
        </GithubLink>
      </Link>
    </StyledText>
  )
}
