import React from "react"
import { styled } from "@linaria/react"
import { ExternalLink } from "react-feather"

import config from "../../../config"

import { Link } from "../atoms/Link"
import { ContentPadding } from "../atoms/ContentPadding"
import { StyledText } from "../atoms/StyledText"
import { GithubProfile } from "../molecules/GithubProfile"

const StyledFooter = styled.footer`
  padding: 1rem 0;
  border-top: 1px solid var(--decoColor);
  content-visibility: auto;
  contain-intrinsic-size: 0 175px;
`

export const Footer = () => (
  <ContentPadding>
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

      {config.author?.githubUrl ? (
        <GithubProfile
          url={config.author.githubUrl}
          nickname={config.author.githubNickname}
        />
      ) : null}
    </StyledFooter>
  </ContentPadding>
)
