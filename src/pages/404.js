import React from "react"
import { Layout } from "../components/Layout"
import { Link } from "../components/Link"
import { StyledText } from "../components/StyledText"

const Page404 = props => {
  return (
    <Layout {...props}>
      <StyledText>
        <h1>Такой страницы не существует</h1>
        <p className="paragraph">
          <Link to="/">Главная</Link>
        </p>
      </StyledText>
    </Layout>
  )
}

export default Page404
