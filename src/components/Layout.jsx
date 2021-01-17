import React from "react"
import styled from "@emotion/styled"
import { MDXProvider } from "@mdx-js/react"

import { mdxComponents } from "./mdxComponents"
import { Footer } from "./Footer.jsx"
import config from "../../config"
import { Logo } from "./Logo"
import { Link } from "./Link"

const Header = React.lazy(() => import("./Header").then(module => ({ default: module.Header })))
const Sidebar = React.lazy(() => import("./Sidebar").then(module => ({ default: module.Sidebar })))
const RightSidebar = React.lazy(() => import("./RightSidebar").then(module => ({ default: module.RightSidebar })))

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
    max-width: 1000px;
    position: relative;
  }
`

const LeftSideBar = styled.div`
  max-width: 390px;
  min-width: 300px;
  flex: 1 1 300px;
  z-index: 0;
  box-shadow: var(--boxShadow);
  
  & > .navBarBrand {
    position: fixed;
    top: 15px;
    left: 15px;
  }
`

const RightSideBarWidth = styled("div")`
  width: 420px;
  flex: 0.2 1 auto;
  
  @media (max-width: 1366px) {
    display: none;
  }
`

export const Layout = ({ children, location }) => {
  const isSSR = typeof window === "undefined"
  const finalLogoLink = config.header.logoLink !== "" ? config.header.logoLink : "/"
  return (
    <MDXProvider components={mdxComponents}>
      {!isSSR && (
        <React.Suspense fallback={<div style={{height: '70px'}}/>}>
          <Header location={location} />
        </React.Suspense>
      )}

      <Wrapper>
        <LeftSideBar className={"hiddenMobile"}>
          <Link
            to={finalLogoLink}
            className={"navBarBrand"}
            aria-label={config.siteMetadata.title}
            title={config.siteMetadata.title}
          >
            <Logo />
          </Link>
          {!isSSR && (
            <React.Suspense fallback={<div />}>
              <Sidebar
                location={location}
                style={{ top: "70px" }}
              />
            </React.Suspense>
          )}
        </LeftSideBar>

        <Content>
          <MaxWidth>{children}</MaxWidth>
          <MaxWidth>
            <Footer />
          </MaxWidth>
        </Content>

        <RightSideBarWidth className={"hiddenMobile rightSidebar"}>
          {!isSSR && (
            <React.Suspense fallback={<div />}>
              <RightSidebar location={location} />
            </React.Suspense>
          )}
        </RightSideBarWidth>
      </Wrapper>
    </MDXProvider>
  )
}
