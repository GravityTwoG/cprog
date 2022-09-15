import React from "react"
import { styled } from "@linaria/react"
import { MDXProvider } from "@mdx-js/react"

import config from "../../config"
import { mdxComponents } from "./mdxComponents"
import { useMediaQuery } from "../hooks/useMediaQuery"

import { Footer } from "./organisms/Footer.jsx"
import { Logo } from "./atoms/Logo"
import { Link } from "./atoms/Link"

import "../styles/theme.css"
import "../styles/global-styles.css"
import "../styles/media-styles.css"
import "../styles/media-btw768-991.css"
import "../styles/media-max1023.css"
import "../styles/media-max767.css"
import "../styles/utility.css"

import { Header } from "./organisms/Header"
import { Navbar } from "./organisms/Navbar"

const Wrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  background: var(--backgroundColor);
`

const Main = styled.main`
  align-self: center;
  overflow: hidden;
  min-height: calc(100vh - 70px);
  contain: content;
  display: flex;
  flex-direction: column;

  flex: 1;
  width: 100%;
  max-width: 100%;
  @media only screen and (min-width: 1279px) {
    max-width: 850px;
    position: relative;
  }

  & > .content {
    flex: 1;
  }

  & > .footer {
    width: 100%;
  }
  & > aside.before-content {
    padding: 0 60px;
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
  position: relative;

  & > span {
    position: sticky;
    top: 10px;
    margin-left: 15px;
    display: block;
  }
  & > .sticky {
    position: sticky;
    top: 70px;
  }

  @media (max-width: 1365px) {
    max-width: 320px;
  }
`

const RightSideBarWidth = styled.div`
  max-width: 420px;
  flex: 0.2 1 auto;

  & > aside.sticky {
    position: fixed;
    position: sticky;
    top: 70px;
    height: 100vh;
    overflow: auto;
  }

  @media (max-width: 1140px) {
    display: none;
  }
`

export const Layout = ({ children, location }) => {
  const finalLogoLink =
    config.header.logoLink !== "" ? config.header.logoLink : "/"

  const isPhoneOrTablet = useMediaQuery("(max-width: 1023px)")
  return (
    <MDXProvider components={mdxComponents}>
      <div style={{ height: "70px", width: "100%" }}>
        <Header location={location} />
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

            <Navbar location={location} className="sticky" />
          </LeftSideBar>
        )}

        <Main>
          <div className="content">{children}</div>
          <div className="footer">
            <Footer />
          </div>
        </Main>

        <RightSideBarWidth className={"rightSidebar "} />
      </Wrapper>
    </MDXProvider>
  )
}
