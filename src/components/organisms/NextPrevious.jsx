import React, { useMemo } from "react"
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

  const { nextInfo, previousInfo } = useMemo(() => {
    const idx = nav.findIndex(el => el && el.url === mdx.fields.slug)

    const prev = {}
    const next = {}

    if (idx < 0) {
      prev.url = null
      prev.title = null
      next.url = null
      next.title = null
    } else if (idx === 0) {
      // first page
      prev.url = null
      prev.title = null
      next.url = nav[idx + 1] ? nav[idx + 1].url : null
      next.title = nav[idx + 1] ? nav[idx + 1].title : null
    } else if (idx === nav.length - 1) {
      // last page
      prev.url = nav[idx - 1] ? nav[idx - 1].url : null
      prev.title = nav[idx - 1] ? nav[idx - 1].title : null
      next.url = null
      next.title = null
    } else {
      // any other page
      prev.url = nav[idx - 1].url
      prev.title = nav[idx - 1].title
      next.url = nav[idx + 1].url
      next.title = nav[idx + 1].title
    }

    return { previousInfo: prev, nextInfo: next }
  }, [nav])

  return (
    <StyledNextPrevious>
      {previousInfo.url && (
        <Link
          aria-label={previousInfo.title}
          to={previousInfo.url}
          className={"previousBtn"}
        >
          <div className="arrow">
            <LeftArrow />
          </div>

          <div className={"preRightWrapper"}>
            <div className={"nextPreviousTitle"}>{previousInfo.title}</div>
          </div>
        </Link>
      )}

      {nextInfo.url && (
        <Link
          aria-label={nextInfo.title}
          to={nextInfo.url}
          className={"nextBtn"}
        >
          <div className={"nextRightWrapper"}>
            <div className={"nextPreviousTitle"}>{nextInfo.title}</div>
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
