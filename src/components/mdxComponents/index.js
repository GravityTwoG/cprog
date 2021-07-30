import React from "react"
import { styled } from "@linaria/react"
import { copyToClipboard } from "./copyToClipboard"

import { Pre } from "./Pre"
import { AnchorTag } from "./Anchor"
import { Icon } from "./Icons"
import { Table } from "./Table"
import { BlockQuote } from "./BlockQuote"
import { components } from "./Math"

const StyledCode = styled.code`
  html *:not(pre) > & {
    padding: 0.3em 0.4em !important;
    font-size: 1rem;
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

const StyledHeading = styled.h1`
  & > button {
    margin-left: 0.2em;
    border: none;
    background-color: transparent;
    cursor: pointer;
    font-size: 24px;
    font-weight: 700;
    vertical-align: middle;
    transition: color 0.3s linear;

    &:hover {
      color: var(--accentColor);
    }
    &:active {
      color: initial;
    }
  }
`

const Heading = ({ children, as = "h1", ...props }) => {
  const id = generateHeadingId(children)
  let url = ""

  if (typeof window !== "undefined") {
    url = window.location.origin + window.location.pathname + "#" + id
  }

  return (
    <StyledHeading as={as} {...props} id={id}>
      {children}{" "}
      {url && (
        <button
          aria-label="Скопировать ссылку"
          title="Скопировать ссылку"
          onClick={() => copyToClipboard(url)}
        >
          #
        </button>
      )}
    </StyledHeading>
  )
}

export function generateHeadingId(title) {
  return title
    .replace(/[/,.\()\?–]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase()
}

export const mdxComponents = {
  h1: ({ children, ...props }) => (
    <Heading as="h1" className="heading1" {...props}>
      {children}
    </Heading>
  ),
  h2: ({ children, ...props }) => (
    <Heading as="h2" className="heading2" {...props}>
      {children}
    </Heading>
  ),
  h3: ({ children, ...props }) => (
    <Heading as="h3" className="heading3" {...props}>
      {children}
    </Heading>
  ),
  h4: ({ children, ...props }) => (
    <Heading as="h4" className="heading4" {...props}>
      {children}
    </Heading>
  ),
  h5: ({ children, ...props }) => (
    <Heading as="h5" className="heading5" {...props}>
      {children}
    </Heading>
  ),
  h6: ({ children, ...props }) => (
    <Heading as="h6" className="heading6" {...props}>
      {children}
    </Heading>
  ),
  p: props => <p className="paragraph" {...props} />,
  pre: Pre,
  a: AnchorTag,
  code: StyledCode,
  Icon,
  blockquote: BlockQuote,
  table: Table,
  Flex: StyledFlex,
  div: components.div,
  span: components.span,
}
