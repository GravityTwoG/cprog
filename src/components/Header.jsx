import React from "react"
import styled from "@emotion/styled"
import { useStaticQuery, graphql } from "gatsby"
import GitHubButton from "react-github-btn"

import config from "../../config.js"
import { DarkModeSwitch } from "./DarkModeSwitch"
import { Link } from "./Link"
import { Sidebar } from "./Sidebar"

const help = require("./images/help.svg")

function myFunction() {
  var x = document.getElementById("navbar")

  if (x.className === "topnav") {
    x.className += " responsive"
  } else {
    x.className = "topnav"
  }
}

const StyledBgDiv = styled("div")`
  height: 60px;
  box-shadow: rgba(116, 129, 141, 0.1) 0px 3px 8px 0px;
  background-color: #fff;
  position: relative;
  display: none;
  background: ${props => (props.isDarkThemeActive ? "#001932" : "#fff")};

  @media (max-width: 767px) {
    display: block;
  }
`

const StyledNav = styled("nav")`
  background-color: ${({ theme }) => theme.colors.background};
`

const StyledHeaderTitle = styled("div")`
  color: ${({ theme }) => theme.colors.text};
`

const logoImg = require("./images/logo.svg")

export const Header = ({ location, isDarkThemeActive, toggleActiveTheme }) => {
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

  const finalLogoLink = logo.link !== "" ? logo.link : "https://hasura.io/"

  return (
    <div className={"navBarWrapper"}>
      <StyledNav className={"navBarDefault"}>
        <div className={"navBarHeader"}>
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
        </div>
        {config.header.social ? (
          <ul
            className="socialWrapper visibleMobileView"
            dangerouslySetInnerHTML={{ __html: config.header.social }}
          ></ul>
        ) : null}

        <div id="navbar" className={"topnav"}>
          <div className={"visibleMobile"}>
            <Sidebar location={location} />
            <hr />
          </div>
          <ul className={"navBarUL navBarNav navBarULRight"}>
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

            {githubUrl !== "" ? (
              <li className="divider hiddenMobile"></li>
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
              <DarkModeSwitch
                isDarkThemeActive={isDarkThemeActive}
                toggleActiveTheme={toggleActiveTheme}
              />
            </li>
          </ul>
        </div>
      </StyledNav>

      <StyledBgDiv isDarkThemeActive={isDarkThemeActive}>
        <div className={"navBarDefault removePadd"}>
          <span
            onClick={myFunction}
            className={"navBarToggle"}
            onKeyDown={myFunction}
            role="button"
            tabIndex={0}
          >
            <span className={"iconBar"}></span>
            <span className={"iconBar"}></span>
            <span className={"iconBar"}></span>
          </span>
        </div>
      </StyledBgDiv>
    </div>
  )
}
