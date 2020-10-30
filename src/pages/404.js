import React from "react"
import { Layout } from "../components/Layout"
import { Link } from "../components/Link"

const Page404 = () => {
  return (
    <Layout>
      <h1>Такой страницы не существует</h1>
      <Link to="/">Главная</Link>
    </Layout>
  )
}

export default Page404
