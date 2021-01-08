import React from "react"
import styled from "@emotion/styled"
import { MDXProvider } from "@mdx-js/react"

import { mdxComponents } from "./mdxComponents"
import { Footer } from "./Footer.jsx"
import { Sidebar } from "./Sidebar"
import { RightSidebar } from "./RightSidebar"
import { Header } from "./Header.jsx"

const Wrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  background: var(--backgroundColor);

  .sideBarUL li a {
    color: var(--textColor);
  }

  .sideBarUL .item > a:hover {
    background-color: var(--accentColor);
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
  align-items: center;
  flex: 1 1 100%;
  overflow: hidden;
  background: var(--backgroundColor);
  min-height: calc(100vh - 70px);
  table tr {
    background: var(--backgroundColor);
  }
`

const MaxWidth = styled("div")`
  flex: 1;
  width: 100%;
  max-width: 100%;
  @media only screen and (min-width: 1279px) {
    max-width: 900px;
    position: relative;
  }
`

const LeftSideBar = styled.div`
  max-width: 390px;
  min-width: 300px;
  flex: 1 1 300px;
  z-index: 0;
  box-shadow: var(--boxShadow);
`

const RightSideBarWidth = styled("div")`
  width: 224px;
  flex: 0.2 1 auto;
`

export const Layout = ({ children, location }) => {
  return (
    <MDXProvider components={mdxComponents}>
      <Header location={location} />

      <Wrapper>
        <LeftSideBar className={"hiddenMobile"}>
          <Sidebar location={location} style={{ top: "70px" }} />
        </LeftSideBar>

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
