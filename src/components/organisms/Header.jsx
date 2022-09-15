import React, { useEffect, useRef, useCallback } from "react"
import { styled } from "@linaria/react"

import { useStaticQuery, graphql } from "gatsby"
import { useMediaQuery } from "../../hooks/useMediaQuery"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import { useThemeContext } from "../ThemeProvider"

import { Link } from "../atoms/Link"
import { Logo } from "../atoms/Logo.jsx"
import { BurgerButton } from "../atoms/BurgerButton"
import { DarkModeSwitch } from "../molecules/DarkModeSwitch"
import { Navbar } from "./Navbar"

import config from "../../../config"

const headerHeight = 70
const StyledHeader = styled.header`
  width: 100vw;
  height: ${headerHeight}px;
  padding: 15px 27px 15px 15px;
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

  @media (max-width: 768px) {
    padding: 15px;
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
    transition: transform 0.2s ease, visibility 0.2s ease;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
    will-change: transform;
    content-visibility: auto;
    contain-intrinsic-size: 431px 100vh;
    contain: layout paint;

    &[data-is-open="true"] {
      -webkit-transform: translate3d(0%, 0, 0);
      transform: translate3d(0%, 0, 0);
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
          headerLinks {
            link
            text
          }
        }
      }
    }
  `)
  const { headerTitle, headerLinks } = data.site.siteMetadata

  const burgerButtonRef = useRef(null)
  const navbarRef = useRef(null)

  useOnClickOutside(navbarRef, e => {
    if (e.target === burgerButtonRef.current) return

    navbarRef.current.dataset.isOpen = "false"
    burgerButtonRef.current.dataset.isOpen = "false"
    document.body.style.overflow = "auto"
  })

  const toggleNavbar = useCallback(() => {
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
  }, [navbarRef, burgerButtonRef])

  const isPhoneOrTablet = useMediaQuery("(max-width: 1023px)")
  useEffect(() => {
    if (!isPhoneOrTablet) {
      document.body.style.overflow = "auto"
    }
  }, [isPhoneOrTablet])

  // Hide navbar on pathname change
  useEffect(() => {
    if (navbarRef.current && burgerButtonRef.current) {
      navbarRef.current.dataset.isOpen = "false"
      burgerButtonRef.current.dataset.isOpen = "false"
      document.body.style.overflow = "auto"
    }
  }, [location.pathname])

  // hide header on scroll
  const headerRef = useRef(null)
  useEffect(() => {
    let prevScrollPos = window.scrollY
    let delta = headerHeight

    function onScroll() {
      if (!headerRef.current) return
      const currentScrollPos = window.scrollY
      delta += currentScrollPos - prevScrollPos

      if (currentScrollPos <= headerHeight) {
        headerRef.current.dataset.isHidden = false
        prevScrollPos = currentScrollPos
        return
      }

      if (delta > headerHeight) {
        delta = headerHeight
        headerRef.current.dataset.isHidden = true
      } else if (delta < 0) {
        delta = 0
        headerRef.current.dataset.isHidden = false
      }

      prevScrollPos = currentScrollPos
    }

    function onKeyUp(event) {
      if (!navbarRef.current || !burgerButtonRef.current) return
      const isOpen = navbarRef.current.dataset.isOpen
      if (event.code === "Escape" && isOpen === "true") {
        navbarRef.current.dataset.isOpen = "false"
        burgerButtonRef.current.dataset.isOpen = "false"
        document.body.style.overflow = "auto"
      }
    }

    window.addEventListener("scroll", onScroll)
    window.addEventListener("keyup", onKeyUp)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("keyup", onKeyUp)
    }
  }, [])

  const [, isDarkThemeActive] = useThemeContext()
  const finalLogoLink =
    config.header.logoLink !== "" ? config.header.logoLink : "/"
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
          className={"headerTitle"}
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
                    label={link.text}
                    title={link.text}
                    dangerouslySetInnerHTML={{ __html: link.text }}
                  />
                }
              </li>
            )
          }
          return null
        })}

        {config.header.social && (
          <li className={"hiddenMobile"}>
            <ul
              className="socialWrapper"
              dangerouslySetInnerHTML={{ __html: config.header.social }}
            />
          </li>
        )}
      </StyledList>

      <DarkModeSwitch style={{ margin: "0 16px 0 auto" }} />
      {isPhoneOrTablet && (
        <BurgerButton
          onClick={toggleNavbar}
          role="button"
          aria-label="Меню"
          title="Меню"
          ref={burgerButtonRef}
          isDarkThemeActive={isDarkThemeActive}
          data-is-open="false"
        />
      )}

      {isPhoneOrTablet && (
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
          </StyledList>

          <Navbar location={location} style={{ maxHeight: "100%" }} />
        </StyledMobileNavbar>
      )}
    </StyledHeader>
  )
}
