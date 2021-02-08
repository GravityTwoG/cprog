import React from "react"
import { styled } from "@linaria/react"
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
const TableOfContents = React.lazy(() =>
  import("./TableOfContents").then(module => ({
    default: module.TableOfContents,
  }))
)

const Wrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  background: var(--backgroundColor);
`

const Content = styled.main`
  align-self: center;
  overflow: hidden;
  background: var(--backgroundColor);
  min-height: calc(100vh - 70px);

  flex: 1;
  width: 100%;
  max-width: 100%;
  @media only screen and (min-width: 1279px) {
    max-width: 850px;
    position: relative;
  }

  & > .footer {
    width: 100%;
  }
  & > aside.before-content {
    padding: 0 60px;

    & > ul > .rightSideTitle {
      border: none;
      padding-left: 0;
      padding-right: 0;
      padding-top: 0;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: color 0.2s linear;

      & > button {
        margin: 0;
      }

      &:hover {
        color: var(--accentColor);
      }
      &:hover svg {
        fill: var(--accentColor);
      }
    }
  }

  @media (max-width: 520px) {
    & > aside.before-content {
      padding: 0 16px;
    }
  }
`

const LeftSideBar = styled.div`
  margin-top: -70px;
  max-width: 390px;
  min-width: 320px;
  flex: 1 1 320px;
  z-index: 0;
  box-shadow: var(--boxShadow);
`

const RightSideBarWidth = styled("div")`
  max-width: 420px;
  flex: 0.2 1 auto;

  & > aside.sticky {
    position: fixed;
    position: sticky;
    top: 70px;
    height: 100vh;
    overflow: auto;
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
          {!isDesktop && !isSSR && (
            <React.Suspense fallback={<div />}>
              <TableOfContents
                location={location}
                isDefaultCollapsed
                className="before-content"
              />
            </React.Suspense>
          )}
          <div>{children}</div>
          <div className="footer">
            <Footer />
          </div>
        </Content>

        {isDesktop && (
          <RightSideBarWidth className={"rightSidebar"}>
            {!isSSR && (
              <React.Suspense fallback={<div />}>
                <TableOfContents location={location} className="sticky" />
              </React.Suspense>
            )}
          </RightSideBarWidth>
        )}
      </Wrapper>
    </MDXProvider>
  )
}
