import React, { useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import config from "../../config.js"
import { useThemeContext } from "./theme/ThemeProvider.jsx"
import styled from "@emotion/styled"

import GitHubButton from "react-github-btn"
import { DarkModeSwitch } from "./DarkModeSwitch"
import { Link } from "./Link"
import { Sidebar } from "./Sidebar"
import { Logo } from "./Logo.jsx"

const help = require("../images/help.svg")

const MLAuto = styled.div`
  margin-left: auto;
`

const StyledNavbarHeader = styled.header`
  display: flex;
  align-items: center;
  flex-grow: 0;
`

const StyledNavbarToggler = styled.div`
  display: none;
  background: transparent;
  border: 0px solid #fff;
  border-radius: 4px;
  width: 36px;
  height: 36px;
  position: relative;
  cursor: pointer;
  z-index: 2;

  & > .iconBar {
    display: block;
    width: 70%;
    height: 4px;
    border-radius: 2px;
    background: ${({ theme }) => theme.colors.accent};
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transition: transform 0.2s ease-in-out, rotate 0.2s ease-in-out;
    transform: translate(-50%, -50%) rotate(0deg);

    &:nth-of-type(1) {
      transform: translate(-50%, calc(-50% - 8px)) rotate(0deg);
    }
    &:nth-of-type(2) {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    &:nth-of-type(3) {
      transform: translate(-50%, calc(-50% + 8px)) rotate(0deg);
    }
  }

  &[data-is-open="true"] > .iconBar {
    &:nth-of-type(1) {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    &:nth-of-type(2) {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &:nth-of-type(3) {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
  @media (max-width: 1024px) {
    display: block;
  }
`

const StyledMobileNavbar = styled.div`
  display: none;
  @media (max-width: 1024px) {
    display: block;
    max-width: 100%;
    max-height: 100vh;
    width: 431px;
    height: 100vh;
    background: ${({ theme }) => theme.colors.background};
    position: fixed;
    top: 0px;
    right: 0%;
    z-index: -1;
    padding-top: 70px;
    box-shadow: ${({ theme }) => theme.boxShadow};
    overflow: hidden;
    transition: transform 0.3s ease-in-out;
    transform: translateX(100%);
    will-change: translateX;

    &[data-is-open="true"] {
      transform: translateX(0%);
    }
  }
`
const StyledList = styled.ul`
  margin-top: 5px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & > li {
    list-style: none;
  }
`

const StyledHeaderTitle = styled("div")`
  color: ${({ theme }) => theme.colors.text};
`

export const Header = ({ location }) => {
  const data = useStaticQuery(graphql`
    query headerTitleQuery {
      site {
        siteMetadata {
          headerTitle
          githubUrl
          helpUrl
          logo {
            link
            image
          }
          headerLinks {
            link
            text
          }
        }
      }
    }
  `)

  const {
    site: {
      siteMetadata: { headerTitle, githubUrl, helpUrl, logo, headerLinks },
    },
  } = data

  const finalLogoLink = logo.link !== "" ? logo.link : "/"
  const [, isDarkThemeActive] = useThemeContext()

  const burgerButtonRef = useRef(null)
  const navbarRef = useRef(null)
  const closeNavbar = () => {
    navbarRef.current.dataset.isOpen = "false"
    burgerButtonRef.current.dataset.isOpen = "false"
    document.body.style.overflow = "auto"
  }
  const openNavbar = () => {
    navbarRef.current.dataset.isOpen = "true"
    burgerButtonRef.current.dataset.isOpen = "true"
    document.body.style.overflow = "hidden"
  }
  const toggleNavbar = () => {
    const isOpen = navbarRef.current.dataset.isOpen
    if (isOpen === "true") {
      closeNavbar()
    } else {
      openNavbar()
    }
  }
  useEffect(() => {
    closeNavbar()
  }, [location.pathname])

  return (
    <HeaderContainer>
      <StyledNavbarHeader>
        <Link to={finalLogoLink} className={"navBarBrand"}>
          <Logo />
        </Link>
        <StyledHeaderTitle
          className={"headerTitle displayInline"}
          dangerouslySetInnerHTML={{ __html: headerTitle }}
        />
      </StyledNavbarHeader>

      {config.header.social ? (
        <ul
          className="socialWrapper visibleMobileView"
          dangerouslySetInnerHTML={{ __html: config.header.social }}
        />
      ) : null}

      <MLAuto>
        <StyledList className="styled-list">
          {headerLinks.map((link, key) => {
            if (link.link !== "" && link.text !== "") {
              return (
                <li key={key}>
                  {
                    // eslint-disable-next-line jsx-a11y/control-has-associated-label
                    <a
                      className="sidebarLink"
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      dangerouslySetInnerHTML={{ __html: link.text }}
                    />
                  }
                </li>
              )
            }
            return null
          })}
          {helpUrl !== "" ? (
            <li>
              <a href={helpUrl}>
                <img src={help} alt={"Help icon"} />
              </a>
            </li>
          ) : null}

          {config.header.social ? (
            <li className={"hiddenMobile"}>
              <ul
                className="socialWrapper"
                dangerouslySetInnerHTML={{ __html: config.header.social }}
              />
            </li>
          ) : null}
          {githubUrl !== "" ? (
            <li className={"githubBtn"}>
              <GitHubButton
                href={githubUrl}
                data-show-count="true"
                aria-label="Star on GitHub"
              >
                Star
              </GitHubButton>
            </li>
          ) : null}
          <li>
            <DarkModeSwitch />
          </li>
        </StyledList>
      </MLAuto>

      <MLAuto>
        <StyledNavbarToggler
          onClick={toggleNavbar}
          role="button"
          ref={burgerButtonRef}
          isDarkThemeActive={isDarkThemeActive}
          data-is-open="false"
        >
          <span className="iconBar" />
          <span className="iconBar" />
          <span className="iconBar" />
        </StyledNavbarToggler>
      </MLAuto>

      <StyledMobileNavbar ref={navbarRef} data-is-open="false">
        <StyledList>
          {headerLinks.map((link, key) => {
            if (link.link !== "" && link.text !== "") {
              return (
                <li key={key}>
                  {
                    // eslint-disable-next-line jsx-a11y/control-has-associated-label
                    <a
                      className="sidebarLink"
                      href={link.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      dangerouslySetInnerHTML={{ __html: link.text }}
                    />
                  }
                </li>
              )
            }
            return null
          })}
          {helpUrl !== "" ? (
            <li>
              <a href={helpUrl}>
                <img src={help} alt={"Help icon"} />
              </a>
            </li>
          ) : null}

          {config.header.social ? (
            <li className={"hiddenMobile"}>
              <ul
                className="socialWrapper"
                dangerouslySetInnerHTML={{ __html: config.header.social }}
              />
            </li>
          ) : null}
          {githubUrl !== "" ? (
            <li className={"githubBtn"}>
              <GitHubButton
                href={githubUrl}
                data-show-count="true"
                aria-label="Star on GitHub"
              >
                Star
              </GitHubButton>
            </li>
          ) : null}
        </StyledList>

        <Sidebar
          location={location}
          style={{ maxHeight: "calc(100% - 60px)" }}
        />
      </StyledMobileNavbar>
    </HeaderContainer>
  )
}

const StyledHeader = styled.header`
  height: 70px;
`

const StyledHeaderBG = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.boxShadow};
`

const StyledHeaderContent = styled.div`
  width: 100%;
  height: 70px;
  padding: 15px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  transition: transform 0.3s ease-in-out;
  transform: translateY(0%);
  will-change: translateY;

  &[data-is-hidden="true"] {
    transform: translateY(-100%);
  }

  @media (max-width: 767px) {
    & .styled-list .githubBtn {
      display: none;
    }
  }
`

const HeaderContainer = ({ children }) => {
  const headerRef = useRef(null)
  useEffect(() => {
    let prevScrollpos = window.pageYOffset

    function onScroll() {
      const currentScrollPos = window.pageYOffset
      if (currentScrollPos > 70 && currentScrollPos > prevScrollpos) {
        headerRef.current.dataset.isHidden = true
      } else {
        headerRef.current.dataset.isHidden = false
      }

      prevScrollpos = currentScrollPos
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <StyledHeader>
      <StyledHeaderContent ref={headerRef} data-is-hidden="false">
        <StyledHeaderBG />
        {children}
      </StyledHeaderContent>
    </StyledHeader>
  )
}
