import React from "react"
import styled from "@emotion/styled"
import { Grid, Row, Col } from "react-flexbox-grid"

import { CodeBlock } from "./CodeBlock"
import { Pre } from "./Pre"
import { AnchorTag } from "./Anchor"
import { Icon } from "./Icons"

const StyledImage = styled.img`
  background-color: #fff;
`

const StyledTableWrapper = styled.div`
  max-width: 100%;
  width: 100%;
  overflow-x: auto;

  table {
    max-width: 100%;
  }
`

const StyledGrid = styled(Grid)`
  padding-left: 0;
  padding-right: 0;
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
  code: CodeBlock,
  a: AnchorTag,
  Grid: StyledGrid,
  Row,
  Col,
  img: StyledImage,
  Icon,
  // TODO add `blockquote`
  // TODO add `ul`
  // TODO add `li`
  table: props => (
    <StyledTableWrapper>
      <table {...props} />
    </StyledTableWrapper>
  ),
}
