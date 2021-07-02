import React from "react"
import { styled } from "@linaria/react"

import { Link } from "../components/atoms/Link"
import { StyledText } from "../components/atoms/StyledText"

const StyledContent = styled.div`
  padding: 20px 60px;
  min-height: 20vh;

  @media (max-width: 520px) {
    padding: 20px 16px;
  }
`

const Page404 = () => {
  return (
    <StyledContent>
      <StyledText>
        <h1>Страница не найдена</h1>
        <p className="paragraph">
          <Link to="/">Главная</Link>
        </p>
      </StyledText>
    </StyledContent>
  )
}

export default Page404
