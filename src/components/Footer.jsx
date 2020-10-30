import React from "react"
import { ExternalLink } from "react-feather"
import styled from "@emotion/styled"
import { Link } from "./Link"
import { StyledText } from "./StyledText"

const StyledFooter = styled.footer`
  padding: 1rem 0;
`

export const Footer = () => (
  <StyledFooter>
    <StyledText>
      <strong>Все материалы взяты с сайта </strong>
      <Link to="http://ermak.cs.nstu.ru/cprog/html/">
        ermak.cs.nstu.ru/cprog/html
        <ExternalLink size={14} style={{ marginLeft: "0.3rem" }} />
      </Link>
    </StyledText>
  </StyledFooter>
)
