import React from "react"
import styled from "@emotion/styled"
import { MDXProvider } from "@mdx-js/react"

import { mdxComponents } from "./mdxComponents"
import { useMediaQuery } from "./useMediaQuery"

import { Footer } from "./Footer.jsx"
import config from "../../config"
import { Logo } from "./Logo"
import { Link } from "./Link"

const Header = React.lazy(() =>
  import("./Header").then(module => ({ default: module.Header }))
)
const Sidebar = React.lazy(() =>
  import("./Sidebar").then(module => ({ default: module.Sidebar }))
)
const RightSidebar = React.lazy(() =>
  import("./RightSidebar").then(module => ({ default: module.RightSidebar }))
)

const Wrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  background: var(--backgroundColor);
`

const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 1 100%;
  overflow: hidden;
  background: var(--backgroundColor);
  min-height: calc(100vh - 70px);
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
  min-width: 320px;
  flex: 1 1 320px;
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

  @media (max-width: 1439px) {
    display: none;
  }
`

export const Layout = ({ children, location }) => {
  const isSSR = typeof window === "undefined"
  const finalLogoLink =
    config.header.logoLink !== "" ? config.header.logoLink : "/"

  const isPhoneOrTablet = useMediaQuery("(max-width: 1023px)")
  const isDesktop = useMediaQuery("(min-width: 1440px)")
  return (
    <MDXProvider components={mdxComponents}>
      <div style={{ height: "70px", width: "100%" }}>
        {!isSSR && (
          <React.Suspense fallback={""}>
            <Header location={location} />
          </React.Suspense>
        )}
      </div>

      <Wrapper>
        {!isPhoneOrTablet && (
          <LeftSideBar className={"hiddenMobile"}>
            <Link
              to={finalLogoLink}
              className="navBarBrand"
              aria-label={config.siteMetadata.title}
              title={config.siteMetadata.title}
            >
              <Logo />
            </Link>
            {!isSSR && (
              <React.Suspense fallback={<div />}>
                <Sidebar location={location} style={{ top: "70px" }} />
              </React.Suspense>
            )}
          </LeftSideBar>
        )}

        <Content>
          <MaxWidth>{children}</MaxWidth>
          <MaxWidth>
            <Footer />
          </MaxWidth>
        </Content>

        {isDesktop && (
          <RightSideBarWidth className={"rightSidebar"}>
            {!isSSR && (
              <React.Suspense fallback={<div />}>
                <RightSidebar location={location} />
              </React.Suspense>
            )}
          </RightSideBarWidth>
        )}
      </Wrapper>
    </MDXProvider>
  )
}
