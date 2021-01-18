import React from "react"
import styled from "@emotion/styled"
import { ExternalLink } from "react-feather"

import config from "../../config"

import { Link } from "./Link"
import { StyledText } from "./StyledText"
import { PaddingWrapper } from "../templates/Book"
import { GithubProfile } from "./GithubProfile"

const StyledFooter = styled.footer`
  padding: 1rem 0;
  border-top: 1px solid var(--decoColor);
`

export const Footer = () => (
  <PaddingWrapper>
    <StyledFooter>
      <StyledText>
        <p className="paragraph">
          <strong>Все материалы взяты с сайта </strong>
          <Link to="http://ermak.cs.nstu.ru/cprog/html/" rel="noopener">
            ermak.cs.nstu.ru/cprog/html
            <ExternalLink size={14} style={{ marginLeft: "0.3rem" }} />
          </Link>
        </p>
      </StyledText>

      {config.author?.githubUrl && config.author?.githubUrl ? (
        <GithubProfile url={config.author.githubUrl} nickname={config.author.githubNickname}/>
      ) : null}
    </StyledFooter>
  </PaddingWrapper>
)
