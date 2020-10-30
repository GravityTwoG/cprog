import React from "react"
import styled from "@emotion/styled"
import { MDXProvider } from "@mdx-js/react"

import ThemeProvider from "./theme/ThemeProvider"
import mdxComponents from "./mdxComponents"
import config from "../../config.js"
import { Footer } from "./Footer.jsx"
import { Sidebar } from "./Sidebar"
import { RightSidebar } from "./RightSidebar"

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

    /* background: #F8F8F8 */
  }

  @media only screen and (max-width: 767px) {
    display: block;
  }
`

const Content = styled("main")`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0px 88px;
  padding-top: 3rem;
  background: ${({ theme }) => theme.colors.background};

  table tr {
    background: ${({ theme }) => theme.colors.background};
  }

  @media only screen and (max-width: 1023px) {
    padding-left: 0;
    margin: 0 10px;
    padding-top: 3rem;
  }
`

const MaxWidth = styled("div")`
  @media only screen and (min-width: 1279px) {
    width: 100%;
    max-width: 900px;
    position: relative;
  }
`

const ChildrenContainer = styled.div`
  flex: 1;
`

const LeftSideBarWidth = styled("div")`
  width: 298px;
`

const RightSideBarWidth = styled("div")`
  width: 224px;
`

export const Layout = ({ children, location }) => (
  <ThemeProvider location={location}>
    <MDXProvider components={mdxComponents}>
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
          <ChildrenContainer>
            <MaxWidth>{children}</MaxWidth>
          </ChildrenContainer>
          <MaxWidth>
            <Footer />
          </MaxWidth>
        </Content>

        <RightSideBarWidth className={"hiddenMobile"}>
          <RightSidebar location={location} />
        </RightSideBarWidth>
      </Wrapper>
    </MDXProvider>
  </ThemeProvider>
)
