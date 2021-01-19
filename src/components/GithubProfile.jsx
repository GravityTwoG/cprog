import React from "react"

import { StyledText } from "./StyledText"
import { GithubButton } from "./GithubButton";

export const GithubProfile = ({url, nickname}) => {
  return (
    <StyledText>
      <strong style={{ marginRight: ".8em" }}>Разработано</strong>
      <GithubButton to={url} style={{verticalAlign: "middle"}}>
        {nickname}
      </GithubButton>
    </StyledText>
  )
}