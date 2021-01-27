import React from "react"
import styled from "@emotion/styled"

import { Pre } from "./Pre"
import { AnchorTag } from "./Anchor"
import { Icon } from "./Icons"
import { Table } from "./Table"

const StyledImage = styled.img`
  background-color: #fff;
`

const StyledCode = styled.code`
  html *:not(pre) > & {
    padding: 0.2em 0.3em !important;
  }
`

const StyledFlex = styled.div`
  display: flex;

  &.ais {
    align-items: stretch;
  }
  &.fxww {
    flex-wrap: wrap;
  }

  &.fc2 > * {
    width: 50%;
  }
  &.flex-childs > * {
    flex: 1 0 auto;
  }
`

const StyledUL = styled.ul`
  margin: 24px 0px;
  padding-inline-start: 1.3em;

  li {
    font-size: 16px;
    line-height: 1.8;
    font-weight: 400;
  }
`

export const mdxComponents = {
  h1: ({ children, ...props }) => (
    <h1
      className="heading1"
      id={children.replace(/\s+/g, "").toLowerCase()}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="heading2"
      id={children.replace(/\s+/g, "").toLowerCase()}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="heading3"
      id={children.replace(/\s+/g, "").toLowerCase()}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4
      className="heading4"
      id={children.replace(/\s+/g, "").toLowerCase()}
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5
      className="heading5"
      id={children.replace(/\s+/g, "").toLowerCase()}
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6
      className="heading6"
      id={children.replace(/\s+/g, "").toLowerCase()}
      {...props}
    >
      {children}
    </h6>
  ),
  p: props => <p className="paragraph" {...props} />,
  pre: Pre,
  code: StyledCode,
  a: AnchorTag,
  img: StyledImage,
  Icon,
  // TODO add `blockquote`
  table: Table,
  ul: StyledUL,
  Flex: StyledFlex,
}
