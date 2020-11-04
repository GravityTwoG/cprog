import React from "react"
import styled from "@emotion/styled"
import { useStaticQuery, graphql } from "gatsby"
import GitHubButton from "react-github-btn"

import config from "../../config.js"
import { DarkModeSwitch } from "./DarkModeSwitch"
import { Link } from "./Link"
import { Sidebar } from "./Sidebar"
import { useThemeContext } from "./theme/ThemeProvider.jsx"

const help = require("./images/help.svg")

function myFunction() {
  const x = document.getElementById("navbar")
  const b = document.getElementById("burger-button")

  if (x.className.includes("is-open")) {
    x.classList.remove("is-open")
    b.classList.remove("is-open")
  } else {
    x.classList.add("is-open")
    b.classList.add("is-open")
  }
}

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
  background: ${props => (props.isDarkThemeActive ? "#2d3b48" : "#fff")};
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

  &.is-open > .iconBar {
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
  @media (max-width: 767px) {
    display: block;
  }
`

const StyledMobileNavbar = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    max-width: 100%;
    max-height: 100vh;
    width: 431px;
    height: 100vh;
    background: ${({ theme }) => theme.colors.background};
    position: fixed;
    top: 0px;
    right: -100%;
    z-index: 1;
    padding-top: 70px;
    transition: right 0.3s ease-in-out;
    overflow: hidden;
    box-shadow: rgba(116, 129, 141, 0.1) 0px 3px 8px 0px;

    &.is-open {
      right: 0;
      overflow-y: auto;
    }
  }
`
const StyledList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  & > li {
    list-style: none;
  }
`

const StyledNav = styled("nav")`
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
  z-index: 1;

  @media (max-width: 767px) {
    & .styled-list {
      display: none;
    }
  }
`

const StyledHeaderTitle = styled("div")`
  color: ${({ theme }) => theme.colors.text};
`

const logoImg = require("./images/logo.svg")

export const Header = () => {
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

  return (
    <div className={"navBarWrapper"}>
      <StyledNav className={"navBarDefault"}>
        <StyledNavbarHeader>
          <Link to={finalLogoLink} className={"navBarBrand"}>
            <img
              className={"img-responsive displayInline"}
              src={logo.image !== "" ? logo.image : logoImg}
              alt={"logo"}
            />
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
          ></ul>
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
                ></ul>
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
            onClick={myFunction}
            role="button"
            isDarkThemeActive={isDarkThemeActive}
            id="burger-button"
          >
            <span className="iconBar" />
            <span className="iconBar" />
            <span className="iconBar" />
          </StyledNavbarToggler>
        </MLAuto>

        <StyledMobileNavbar id="navbar">
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
                ></ul>
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

          <Sidebar />
        </StyledMobileNavbar>
      </StyledNav>
    </div>
  )
}
