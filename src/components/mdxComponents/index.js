import React from "react"
import styled from "@emotion/styled"
import { Grid, Row, Col } from "react-flexbox-grid"

import CodeBlock from "./codeBlock"
import AnchorTag from "./anchor"

const StyledPre = styled("pre")`
  padding: 16px 16px;
  background: ${props => props.theme.colors.preFormattedText};
  border-radius: 5px;

  @media (max-width: 768px) {
    padding: 8px 8px;
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
  pre: props => <StyledPre {...props} />,
  code: CodeBlock,
  a: AnchorTag,
  Grid: StyledGrid,
  Row,
  Col,
  // TODO add `img`
  // TODO add `blockquote`
  // TODO add `ul`
  // TODO add `li`
  // TODO add `table`
}
