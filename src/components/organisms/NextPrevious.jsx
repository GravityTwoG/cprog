import React from "react"
import { styled } from "@linaria/react"
import { Link } from "gatsby"
import { useNavigationArray } from "../../hooks/useNavigationArray"

export const StyledNextPrevious = styled.div`
  margin: 2rem 0;
  padding: 0px;
  width: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
  grid-auto-rows: 1fr;
  grid-gap: 1.5rem;

  .previousBtn,
  .nextBtn {
    max-height: 125px;
    padding: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    min-width: min-content;
    cursor: pointer;
    position: relative;

    color: var(--textColor);
    border-radius: 3px;
    border: 1px solid var(--decoColor);
    text-decoration: none;
    background-color: var(--backgroundColor);

    transition: border-color 200ms ease, color 200ms ease;
    box-shadow: var(--boxShadow);
  }

  .nextBtn:hover,
  .previousBtn:hover {
    border-color: var(--linkColor);
    color: var(--linkColor);
  }

  .nextBtn:hover .arrow,
  .previousBtn:hover .arrow {
    color: var(--linkColor);
  }

  .arrow {
    display: block;
    margin: 0px;
    color: rgb(157, 170, 182);
    flex: 0 0 auto;
    font-size: 24px;
    transition: color 200ms ease;
    padding: 16px;
  }

  .preRightWrapper,
  .nextRightWrapper {
    flex: 1 1 0%;
    padding: 16px;
    max-height: 100%;
    align-self: flex-start;
  }
  .preRightWrapper {
    text-align: right;
  }
  .nextRightWrapper {
    text-align: left;
  }

  .nextPreviousTitle {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    line-clamp: 2;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 200ms ease;
    font-size: 16px;
    line-height: 18px;
    font-weight: 500;
  }
`

export const NextPrevious = ({ mdx }) => {
  const nav = useNavigationArray()
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
      {previousInfo.url && currentIndex >= 0 && (
        <Link
          aria-label={nav[currentIndex - 1].title}
          to={nav[currentIndex - 1].url}
          className={"previousBtn"}
        >
          <div className="arrow">
            <LeftArrow />
          </div>

          <div className={"preRightWrapper"}>
            <div className={"nextPreviousTitle"}>
              {nav[currentIndex - 1].title}
            </div>
          </div>
        </Link>
      )}

      {nextInfo.url && currentIndex >= 0 && (
        <Link
          aria-label={nav[currentIndex + 1] && nav[currentIndex + 1].title}
          to={nav[currentIndex + 1].url}
          className={"nextBtn"}
        >
          <div className={"nextRightWrapper"}>
            <div className={"nextPreviousTitle"}>
              {nav[currentIndex + 1] && nav[currentIndex + 1].title}
            </div>
          </div>

          <div className="arrow">
            <RightArrow />
          </div>
        </Link>
      )}
    </StyledNextPrevious>
  )
}

const LeftArrow = () => (
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
)

const RightArrow = () => (
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
)
