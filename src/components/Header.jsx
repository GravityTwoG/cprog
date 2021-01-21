import React, { useEffect, useRef } from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import config from "../../config.js"
import { useThemeContext } from "./theme/ThemeProvider.jsx"

import { DarkModeSwitch } from "./DarkModeSwitch"
import {Sidebar} from "./Sidebar"
import { Link } from "./Link"
import { Logo } from "./Logo.jsx"


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

const BurgerButton = styled.button`
  display: none;
  border: 0 solid #fff;
  border-radius: 4px;
  width: 36px;
  height: 36px;
  position: relative;
  outline: none;
  cursor: pointer;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0);
  transition: background-color 0.2s linear;
  
  &:hover, &:focus, &:focus-within, &:focus-visible {
    background-color: rgba(25,25,25, 0.2);
    html[data-theme="dark"] & {
      background-color: rgba(119,119,119, 0.4);
    }
  }
  
  & > div {
    width: 70%;
    height: 4px;
    border-radius: 2px;
    background: var(--accentColor);
    pointer-events: none;
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    transition: transform 0.3s ease-in-out, rotate 0.3s ease-in-out;
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

  &[data-is-open="true"] > div {
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
    display: inline-block;
  }
`

const StyledMobileNavbar = styled.div`
  display: none;
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
  transition: transform 0.3s ease-in-out;
  transform: translate(100%) rotateZ(0);
  will-change: transform;

  &[data-is-open="true"] {
    transform: translate(0%) rotateZ(0);
  }
  @media (max-width: 1024px) {
    display: block;
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

  const headerRef = useRef(null)
  useEffect(() => {
    let prevScrollPos = window.pageYOffset
    function onScroll() {
      const currentScrollPos = window.pageYOffset
      headerRef.current.dataset.isHidden = currentScrollPos > 70 && currentScrollPos > prevScrollPos;
      prevScrollPos = currentScrollPos
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <StyledHeader ref={headerRef} data-is-hidden="false">
      <StyledHeaderBG />
      <Link
        to={finalLogoLink}
        className={"navBarBrand"}
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
      >
        <div /><div /><div />
      </BurgerButton>

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
        </StyledList>

        <Sidebar
          location={location}
          style={{ maxHeight: "100%" }}
        />
      </StyledMobileNavbar>
    </StyledHeader>
  )
}