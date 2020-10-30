import React from "react"
import styled from "@emotion/styled"
import { Link } from "./Link"

export const StyledNextPrevious = styled("div")`
  margin: 0px;
  padding: 0px;
  width: auto;
  display: grid;
  grid-template-rows: auto;
  column-gap: 24px;
  grid-template-columns: calc(50% - 8px) calc(50% - 8px);

  .previousBtn {
    cursor: pointer;
    -moz-box-align: center;
    -moz-box-direction: normal;
    -moz-box-orient: horizontal;
    margin: 0px;
    padding: 0px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    place-self: stretch;
    border-radius: 3px;
    border: 1px solid rgb(230, 236, 241);
    transition: border 200ms ease 0s;
    box-shadow: rgba(116, 129, 141, 0.1) 0px 3px 8px 0px;
    text-decoration: none;

    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }

  .nextBtn {
    cursor: pointer;
    -moz-box-align: center;
    -moz-box-direction: normal;
    -moz-box-orient: horizontal;
    margin: 0px;
    padding: 0px;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    place-self: stretch;
    border-radius: 3px;
    border: 1px solid rgb(230, 236, 241);
    transition: border 200ms ease 0s;
    box-shadow: rgba(116, 129, 141, 0.1) 0px 3px 8px 0px;
    text-decoration: none;

    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
  }

  .nextBtn:hover,
  .previousBtn:hover {
    text-decoration: none;
    border: 1px solid ${({ theme }) => theme.colors.link};
  }

  .nextBtn:hover .rightArrow,
  .previousBtn:hover .leftArrow {
    color: ${({ theme }) => theme.colors.link};
  }

  .leftArrow {
    display: block;
    margin: 0px;
    color: rgb(157, 170, 182);
    flex: 0 0 auto;
    font-size: 24px;
    transition: color 200ms ease 0s;
    padding: 16px;
    padding-right: 16px;
  }

  .rightArrow {
    flex: 0 0 auto;
    font-size: 24px;
    transition: color 200ms ease 0s;
    padding: 16px;
    padding-left: 16px;
    display: block;
    margin: 0px;
    color: rgb(157, 170, 182);
  }

  .nextPreviousTitle {
    display: block;
    margin: 0px;
    padding: 0px;
    transition: color 200ms ease 0s;
  }

  .nextPreviousTitle span {
    font-size: 16px;
    line-height: 1.5;
    font-weight: 500;
  }

  @media (max-width: 767px) {
    display: block;
    padding: 0 15px;

    .previousBtn {
      margin-bottom: 20px;
    }
  }
`

export const NextPrevious = ({ mdx, nav }) => {
  let currentIndex

  nav.forEach((el, index) => {
    if (el && el.url === mdx.fields.slug) {
      currentIndex = index
    }
  })

  const nextInfo = {}

  const previousInfo = {}

  if (currentIndex === undefined) {
    // index
    if (nav[0]) {
      nextInfo.url = nav[0].url
      nextInfo.title = nav[0].title
    }
    previousInfo.url = null
    previousInfo.title = null
    currentIndex = -1
  } else if (currentIndex === 0) {
    // first page
    nextInfo.url = nav[currentIndex + 1] ? nav[currentIndex + 1].url : null
    nextInfo.title = nav[currentIndex + 1] ? nav[currentIndex + 1].title : null
    previousInfo.url = null
    previousInfo.title = null
  } else if (currentIndex === nav.length - 1) {
    // last page
    nextInfo.url = null
    nextInfo.title = null
    previousInfo.url = nav[currentIndex - 1] ? nav[currentIndex - 1].url : null
    previousInfo.title = nav[currentIndex - 1]
      ? nav[currentIndex - 1].title
      : null
  } else if (currentIndex) {
    // any other page
    nextInfo.url = nav[currentIndex + 1].url
    nextInfo.title = nav[currentIndex + 1].title
    if (nav[currentIndex - 1]) {
      previousInfo.url = nav[currentIndex - 1].url
      previousInfo.title = nav[currentIndex - 1].title
    }
  }

  return (
    <StyledNextPrevious>
      {previousInfo.url && currentIndex >= 0 ? (
        <Link to={nav[currentIndex - 1].url} className={"previousBtn"}>
          <div className={"leftArrow"}>
            <svg
              preserveAspectRatio="xMidYMid meet"
              height="1em"
              width="1em"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              className="_13gjrqj"
            >
              <g>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </g>
            </svg>
          </div>
          <div className={"preRightWrapper"}>
            <div className={"smallContent"}>
              <span>Previous</span>
            </div>
            <div className={"nextPreviousTitle"}>
              <span>{nav[currentIndex - 1].title}</span>
            </div>
          </div>
        </Link>
      ) : null}
      {nextInfo.url && currentIndex >= 0 ? (
        <Link to={nav[currentIndex + 1].url} className={"nextBtn"}>
          <div className={"nextRightWrapper"}>
            <div className={"smallContent"}>
              <span>Next</span>
            </div>
            <div className={"nextPreviousTitle"}>
              <span>
                {nav[currentIndex + 1] && nav[currentIndex + 1].title}
              </span>
            </div>
          </div>
          <div className={"rightArrow"}>
            <svg
              preserveAspectRatio="xMidYMid meet"
              height="1em"
              width="1em"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              className="_13gjrqj"
            >
              <g>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </g>
            </svg>
          </div>
        </Link>
      ) : null}
    </StyledNextPrevious>
  )
}
