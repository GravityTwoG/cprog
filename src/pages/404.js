import React from "react"
import { Link } from "../components/Link"
import { StyledText } from "../components/StyledText"

const Page404 = () => {
  return (
    <StyledText>
      <h1>Такой страницы не существует</h1>
      <p className="paragraph">
        <Link to="/">Главная</Link>
      </p>
    </StyledText>
  )
}

export default Page404
