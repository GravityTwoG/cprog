import React from "react"
import styled from "@emotion/styled"
import { MDXProvider } from "@mdx-js/react"

import config from "../../config.js"
import { mdxComponents } from "./mdxComponents"
import { Footer } from "./Footer.jsx"
import { Sidebar } from "./Sidebar"
import { RightSidebar } from "./RightSidebar"
import { Header } from "./Header.jsx"

const Wrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.background};

  .sideBarUL li a {
    color: ${({ theme }) => theme.colors.text};
  }

  .sideBarUL .item > a:hover {
    background-color: ${({ theme }) => theme.colors.accent};
    color: #fff !important;
  }

  @media (max-width: 1023px) {
    .rightSidebar {
      display: none;
    }
  }
`

const Content = styled("main")`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0px 60px;
  background: ${({ theme }) => theme.colors.background};
  min-height: calc(100vh - 70px);
  table tr {
    background: ${({ theme }) => theme.colors.background};
  }

  @media only screen and (max-width: 1023px) {
    margin: 0 25px;
  }
  @media only screen and (max-width: 475px) {
    margin: 0 18px;
  }
`

const MaxWidth = styled("div")`
  flex: 1;
  @media only screen and (min-width: 1279px) {
    width: 100%;
    max-width: 900px;
    position: relative;
  }
`

const LeftSideBarWidth = styled("div")`
  width: 310px;
  flex: 1 0 auto;
`

const RightSideBarWidth = styled("div")`
  width: 224px;
`

export const Layout = ({ children, location }) => {
  return (
    <MDXProvider components={mdxComponents}>
      <Header location={location} />

      <Wrapper>
        <LeftSideBarWidth className={"hiddenMobile"}>
          <Sidebar location={location} />
        </LeftSideBarWidth>

        {config.sidebar.title ? (
          <div
            className={"sidebarTitle sideBarShow"}
            dangerouslySetInnerHTML={{ __html: config.sidebar.title }}
          />
        ) : null}

        <Content>
          <MaxWidth>{children}</MaxWidth>
          <MaxWidth>
            <Footer />
          </MaxWidth>
        </Content>

        <RightSideBarWidth className={"hiddenMobile rightSidebar"}>
          <RightSidebar location={location} />
        </RightSideBarWidth>
      </Wrapper>
    </MDXProvider>
  )
}
