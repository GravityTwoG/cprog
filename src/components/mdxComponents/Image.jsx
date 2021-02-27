import React from "react"
import { styled } from "@linaria/react"

const StyledFigure = styled.figure`
  display: block;
  width: 100%;
  height: 100%;
  margin: 0px;
  vertical-align: middle;
  position: absolute;
  top: 0px;
  left: 0px;

  & > div {
    width: calc(100vw - 32px);
    position: absolute;
    top: 100%;
    top: calc(100% + 0.5rem);
    right: 50%;
    transform: translateX(50%);

    & > figcaption {
      font-size: 16px;
      line-height: 1;
      text-align: center;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      line-clamp: 2;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;

      @media (max-width: 767px) {
        font-size: 14px;
      }
    }
  }

  & > img {
    background-color: #fff;
  }
`

export const Image = props => {
  return (
    <StyledFigure>
      <img {...props} />

      <div>
        <figcaption>{props.title}</figcaption>
      </div>
    </StyledFigure>
  )
}
