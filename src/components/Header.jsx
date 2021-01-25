import React, { useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import config from "../../config"
import { useThemeContext } from "./theme/ThemeProvider"

import { DarkModeSwitch } from "./DarkModeSwitch"
import {Sidebar} from "./Sidebar"
import { Link } from "./Link"
import { Logo } from "./Logo.jsx"
import { BurgerButton } from "./BurgerButton";

const help = require("../images/help.svg")

const StyledHeader = styled.header`
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
  transform: translate(0%, 0%) rotateZ(0);
  will-change: transform;

  &[data-is-hidden="true"] {
    transform: translate(0%, -100%) rotateZ(0);
  }

  @media (max-width: 767px) {
    & .styled-list .githubBtn {
      display: none;
    }
  }
`

const StyledHeaderBG = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  background-color: var(--backgroundColor);
  box-shadow: var(--boxShadow);
`

const StyledMobileNavbar = styled.div`
  display: none;
  
  @media (max-width: 1024px) {
    display: block;
    max-width: 100%;
    max-height: 100vh;
    width: 431px;
    height: 100vh;
    background: var(--backgroundColor);
    position: fixed;
    top: 0;
    right: 0;
    z-index: -1;
    padding-top: 70px;
    box-shadow: var(--boxShadow);
    overflow: hidden;
    transition: transform 0.3s ease-in-out, visibility 0.3s linear ;
    transform: translate(100%) rotateZ(0);
    will-change: transform;
    visibility: hidden;

    &[data-is-open="true"] {
      transform: translate(0%) rotateZ(0);
      visibility: visible;
    }
  }
`

const StyledList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-left: auto;
  & > li {
    list-style: none;
  }
`

const StyledHeaderTitle = styled("div")`
  color: var(--textColor);
`

export const Header = ({ location }) => {
  const data = useStaticQuery(graphql`
    query headerTitleQuery {
      site {
        siteMetadata {
          headerTitle
          githubUrl
          helpUrl
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
      siteMetadata: { headerTitle, helpUrl, headerLinks },
    },
  } = data

  const finalLogoLink = config.header.logoLink !== "" ? config.header.logoLink : "/"
  const [, isDarkThemeActive] = useThemeContext()

  const burgerButtonRef = useRef(null)
  const navbarRef = useRef(null)

  const toggleNavbar = () => {
    const isOpen = navbarRef.current.dataset.isOpen
    if (isOpen === "true") {
      navbarRef.current.dataset.isOpen = "false"
      burgerButtonRef.current.dataset.isOpen = "false"
      document.body.style.overflow = "auto"
    } else {
      navbarRef.current.dataset.isOpen = "true"
      burgerButtonRef.current.dataset.isOpen = "true"
      document.body.style.overflow = "hidden"
    }
  }
  useEffect(() => {
    navbarRef.current.dataset.isOpen = "false"
    burgerButtonRef.current.dataset.isOpen = "false"
    document.body.style.overflow = "auto"
  }, [location.pathname])

  const headerRef = useRef(null)
  useEffect(() => {
    let prevScrollPos = window.pageYOffset
    function onScroll() {
      const currentScrollPos = window.pageYOffset
      headerRef.current.dataset.isHidden = currentScrollPos > 70 && currentScrollPos > prevScrollPos;
      prevScrollPos = currentScrollPos
    }

    function onKeyUp(event) {
      const isOpen = navbarRef.current.dataset.isOpen
      if (event.code === 'Escape' && isOpen === "true") {
        navbarRef.current.dataset.isOpen = "false"
        burgerButtonRef.current.dataset.isOpen = "false"
        document.body.style.overflow = "auto"
      }
    }

    window.addEventListener("scroll", onScroll)
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("keyup", onKeyUp)
    }
  }, [])

  return (
    <StyledHeader ref={headerRef} data-is-hidden="false">
      <StyledHeaderBG />
      <Link
        to={finalLogoLink}
        aria-label={config.siteMetadata.title}
        title={config.siteMetadata.title}
      >
        <Logo />
        <StyledHeaderTitle
          className={"headerTitle displayInline"}
          dangerouslySetInnerHTML={{ __html: headerTitle }}
        />
      </Link>

      <StyledList className="styled-list">
        {headerLinks.map((link, key) => {
          if (link.link && link.text) {
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
        {helpUrl ? (
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
      </StyledList>

      <DarkModeSwitch style={{margin: '0 16px 0 auto'}}/>
      <BurgerButton
        onClick={toggleNavbar}
        role="button"
        aria-label="Меню"
        title="Меню"
        ref={burgerButtonRef}
        isDarkThemeActive={isDarkThemeActive}
        data-is-open="false"
      />

      <StyledMobileNavbar ref={navbarRef} data-is-open="false">
        <StyledList>
          {headerLinks.map((link, key) => {
            if (link.link && link.text) {
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
          {helpUrl ? (
            <li>
              <a href={helpUrl}>
                <img src={help} alt={"Help icon"} />
              </a>
            </li>
          ) : null}
        </StyledList>

        <Sidebar
          location={location}
          style={{ maxHeight: "100%" }}
        />
      </StyledMobileNavbar>
    </StyledHeader>
  )
}